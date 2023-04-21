import { payments } from 'bitcoinjs-lib';

export interface Address extends payments.Payment {
    derivationPath: string;
    masterFingerprint: MasterFingerprint;
    type?: 'used' | 'unused';
}

interface BitcoinContextProps {
    mnemonic: string;
    xpub: string[];
    address: Address[];
    descriptorWithChecksum: string
}

interface MasterFingerprint {
    userFingerprint1: Buffer;
    userFingerprint2: Buffer;
    systemFingerprint: Buffer;
}

interface NodeConnectionProps {
    response: any;
    descriptorAddress: any
}
