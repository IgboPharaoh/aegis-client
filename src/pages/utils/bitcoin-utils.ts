import { BIP32Interface, fromBase58, fromSeed } from 'bip32';
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from 'bip39';
import { networks, payments } from 'bitcoinjs-lib';

// returns mmemonic seeds
export const getMnemonic = (): string => {
    return generateMnemonic(256);
};

// get master private key
export const getMasterPrivateKey = async (mnemonic: string): Promise<BIP32Interface> => {
    const seed = await mnemonicToSeed(mnemonic);
    let privateKey = fromSeed(seed, networks.regtest);

    return privateKey;
};

// get master private key
export const getMasterPrivateKeys = async (mnemonics: string[]): Promise<BIP32Interface[]> => {
    const seeds = mnemonics.map((mnemonic) => mnemonicToSeedSync(mnemonic));
    let privateKey = seeds.map((seed) => fromSeed(seed, networks.regtest));

    return privateKey;
};

// generate extended public key from private key
export const getXpubFromPrivateKey = (privateKey: BIP32Interface, derivationPath: string): string => {
    const child = privateKey.derivePath(derivationPath).neutered().toBase58();

    return child;
};

export const getXpubFromPrivateKeys = (privateKeys: BIP32Interface[], derivationPath: string): string[] => {
    const child = privateKeys.map((key) => key.derivePath(derivationPath).neutered().toBase58());
    return child;
};

// derive child public key from extended public key
export const getChildPublicKey = (xpub: string, derivationPath: string): BIP32Interface => {
    const node = fromBase58(xpub, networks.regtest);
    const child = node.derivePath(derivationPath);

    return child;
};

export const getChildPublicKeys = (xpubs: string[], derivationPath: string): BIP32Interface[] => {
    const nodes = xpubs.map((xpub) => fromBase58(xpub, networks.regtest));
    const child = nodes.map((node) => node.derivePath(derivationPath));

    return child;
};

// get multisig address from child public key
export const getMultisigAddress = (userKey: BIP32Interface, redeemKey: BIP32Interface, systemKey: BIP32Interface): payments.Payment => {
    const pubkeys = [userKey.publicKey, redeemKey.publicKey, systemKey.publicKey].map((hex) => hex);

    const address = payments.p2wsh({
        redeem: payments.p2ms({ m: 2, pubkeys }),
    });

    return address;
};

export const getMultisigAddresses = (keys: BIP32Interface[]): payments.Payment => {
    const pubkeys = keys.map((hex) => hex.publicKey);

    const address = payments.p2wsh({
        redeem: payments.p2ms({ m: 2, pubkeys }),
    });

    return address;
};

// descriptor format: wpkh(xpriv+derivationpath)#checksum
export const descriptorsss = (pubkeys: any) => `sh(multi(2,${pubkeys[0]},${pubkeys[1]},${pubkeys[2]}))`;

const descriptorFormat = (childPubkeys: BIP32Interface[]) =>
    `wsh(multi(2,[${childPubkeys[0]?.publicKey.toString('hex')},${childPubkeys[1]?.publicKey.toString('hex')},${childPubkeys[2]?.publicKey.toString(
        'hex'
    )}]))`;

// checksum parameters
const INPUT_CHARSET = '0123456789()[],\'/*abcdefgh@:$%{}IJKLMNOPQRSTUVWXYZ&+-.;<=>?!^_|~ijklmnopqrstuvwxyzABCDEFGH`#"\\ ';
const CHECKSUM_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GENERATOR = [0xf5dee51989, 0xa9fdca3312, 0x1bab10e32d, 0x3706b1677a, 0x644d626ffd];

// function to compute descriptor checksum
export const computeChecksum = (symbols: any) => {
    let checksum = 1;

    for (let k = 0; k < symbols.length; k++) {
        let value = symbols[k];
        let top = checksum >> 35;
        checksum = ((checksum & 0x7ffffffff) << 5) ^ value;

        for (let i = 0; i < 5; i++) {
            checksum ^= (top >> 1) & 1 ? GENERATOR[i] : 0;
        }
    }
    return checksum;
};

//Internal function that does the character to symbol expansion
export const expandChecksum = (character: any): number[] => {
    let groups: number[] = [];
    let symbols: number[] = [];

    for (let i = 0; i < character.length; i++) {
        const char = character.charAt(i);

        if (!INPUT_CHARSET.includes(char)) return [];

        const values = INPUT_CHARSET.indexOf(char);
        symbols.push(values & 31);
        groups.push(values >> 5);

        if (groups.length === 3) {
            symbols.push(groups[0] * 9 + groups[1] * groups[2]);
            groups = [];
        }
    }
    if (groups.length === 1) {
        symbols.push(groups[0]);
    } else if (groups.length === 2) {
        symbols.push(groups[0] * 3 + groups[1]);
    }
    return symbols;
};

//Verify that the checksum is correct in a descriptor
export const verifyDescriptorChecksum = (checksum: string): boolean => {
    if (checksum.charAt(checksum.length - 9) != '#') return false;

    if (
        !checksum
            .slice(-8)
            .split('')
            .every((x) => CHECKSUM_CHARSET.includes(x))
    )
        return false;

    const symbols = expandChecksum(checksum.slice(0, -9)).concat(Array.from(checksum.slice(-8)).map((x) => CHECKSUM_CHARSET.indexOf(x)));

    return computeChecksum(symbols) == 1;
};

// add a checksum to a descriptor without one
export const addCheckSumToDescriptor = (descriptor: string) => {
    const symbols: number[] = expandChecksum(descriptor).concat(Array(0, 0, 0, 0, 0, 0, 0, 0));
    const checksum: number = computeChecksum(symbols) ^ 1;
    return descriptor + '#' + Array.from({ length: 8 }, (_, i) => CHECKSUM_CHARSET[(checksum >> (5 * (7 - i))) & 31]).join('');
};
