import { BIP32Interface } from 'bip32';
import { createContext, memo, ReactNode, useContext, useEffect, useState } from 'react';
import { Address, BitcoinContextProps } from '../interfaces';
import {
    addCheckSumToDescriptor,
    getChildPublicKeys,
    getMasterPrivateKeys,
    getMnemonic,
    getMultisigAddresses,
    getXpubFromPrivateKeys,
} from '../utils/bitcoin-utils';

const BitcoinState: BitcoinContextProps = {
    mnemonic: '',
    xpub: [],
    address: [],
    descriptorWithChecksum: '',
};

const BitcoinContext = createContext<BitcoinContextProps>(BitcoinState);

export const BitcoinContextProvider = memo(function BitcoinContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const [mnemonic, setMnemonic] = useState('');
    const [xpub, setXpub] = useState<string[]>([]);
    const [privateKeys, setPrivateKeys] = useState<BIP32Interface[]>([]);
    const [descriptorWallet, setDescriptorWallet] = useState('');
    const [descriptorWithChecksum, setDescriptorWithChecksum] = useState('');
    const [fingerPrint, setFingerPrint] = useState({
        userFingerprint1: Buffer.from(''),
        userFingerprint2: Buffer.from(''),
        systemFingerprint: Buffer.from(''),
    });
    const [address, setAddress] = useState<Address[]>([]);

    useEffect(() => {
        // generate user keys
        const getSeedValues = async () => {
            try {
                const currentMnemonic = getMnemonic();
                setMnemonic(currentMnemonic);

                // we'll be using hard coded mmenomics for implementation
                const userMnemonic1 =
                    'price body excite behind emerge gym trumpet fetch direct agent cute audit robot credit mimic forward much energy century trial sight almost seek insane';
                const userMnemonic2 =
                    'blame race elite shoulder infant hip army inquiry tomato woman regret occur camera student message outdoor orange gloom luxury mango tide horn fluid web';
                const systemMnemonic =
                    'glow donkey gravity coil lunch pelican topic method attract eye special onion because raven book treat member surprise you display vivid travel lizard weird';

                const privateKeys = await getMasterPrivateKeys([userMnemonic1, userMnemonic2, systemMnemonic]);
                setPrivateKeys(privateKeys);

                setFingerPrint((fingerPrint) => ({
                    ...fingerPrint,
                    userFingerprint1: privateKeys[0].fingerprint,
                    userFingerprint2: privateKeys[1].fingerprint,
                    systemFingerprint: privateKeys[2].fingerprint,
                }));

                const derivationPath = "m/84'/0'/0'"; // P2WPKH
                const xpubs = getXpubFromPrivateKeys(privateKeys, derivationPath);
                setXpub(xpubs);
            } catch (error) {
                console.error(error);
            }
        };

        getSeedValues();
    }, []);

    useEffect(() => {
        try {
            const addressBatch: Address[] = [];
            for (let i = 0; i < 10; i++) {
                const derivationPath = `0/${i}`;

                const childPubkeys = getChildPublicKeys(xpub, derivationPath);
                const mulltisigAddress = getMultisigAddresses(childPubkeys);
                addressBatch?.push({ ...mulltisigAddress, derivationPath, masterFingerprint: fingerPrint });

                // create descriptor from child public keys
                const descriptor = `wsh(multi(2,[${childPubkeys[0]?.publicKey.toString('hex')},${childPubkeys[1]?.publicKey.toString(
                    'hex'
                )},${childPubkeys[2]?.publicKey.toString('hex')}]))`;

                const addChecksum = addCheckSumToDescriptor(descriptor);
                setDescriptorWallet(descriptor);
                setDescriptorWithChecksum(addChecksum);

                setAddress(addressBatch);
            }
        } catch (error) {
            console.error(error);
        }
    }, [xpub, fingerPrint]);

    return <BitcoinContext.Provider value={{ mnemonic, xpub, address, descriptorWithChecksum }}>{children}</BitcoinContext.Provider>;
});

export const useBitcoinContext = () => {
    return useContext(BitcoinContext);
};
