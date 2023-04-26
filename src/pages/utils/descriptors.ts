import * as descriptor from '@bitcoinerlab/descriptors';
import * as secp256k1 from '@bitcoinerlab/secp256k1';
import { BIP32Interface } from 'bip32';
import { Network } from 'bitcoinjs-lib';
import { addCheckSumToDescriptor, verifyDescriptorChecksum } from './bitcoin-utils';

const { Descriptor } = descriptor.DescriptorsFactory(secp256k1);

export const deriveDescriptorAddress = (childPubkeys: Buffer[], sysKey: BIP32Interface, network?: Network) => {
    const descriptorFormat = `wsh(multi(2,[${childPubkeys[0]},${childPubkeys[1]},${sysKey.publicKey.toString('hex')[2]}]))`;

    const descriptorConstructor = new Descriptor({
        expression: descriptorFormat,
        network,
        checksumRequired: true,
        signersPubKeys: [childPubkeys[0], sysKey.publicKey],
    });

    const descriptorAddress = descriptorConstructor.getAddress();

    let checkAddress = '';
    if (verifyDescriptorChecksum(descriptorAddress) === false) {
        checkAddress = addCheckSumToDescriptor(descriptorAddress);
    }
    return checkAddress;
};
