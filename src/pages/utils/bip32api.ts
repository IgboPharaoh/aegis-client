import { BIP32API, BIP32Interface } from 'bip32';
import { Network } from 'bitcoinjs-lib';

// implement bip32 interface
class DeriveKeys implements BIP32API {
    fromSeed = (seed: Buffer, network?: Network | undefined): BIP32Interface => {
        return this.fromSeed(seed, network);
    };

    fromBase58(inString: string, network?: Network | undefined): BIP32Interface {
        return this.fromBase58(inString, network);
    }

    fromPublicKey(publicKey: Buffer, chainCode: Buffer, network?: Network | undefined): BIP32Interface {
        return this.fromPublicKey(publicKey, chainCode, network);
    }

    fromPrivateKey(privateKey: Buffer, chainCode: Buffer, network?: Network | undefined): BIP32Interface {
        return this.fromPrivateKey(privateKey, chainCode, network);
    }
}

const keyClass = new DeriveKeys();
export default keyClass;
