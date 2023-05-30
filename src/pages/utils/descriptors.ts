import * as descriptor from '@bitcoinerlab/descriptors';
import * as secp256k1 from '@bitcoinerlab/secp256k1';
import { Psbt, networks } from 'bitcoinjs-lib';
import { addCheckSumToDescriptor, verifyDescriptorChecksum } from './bitcoin-utils';

const { Descriptor } = descriptor.DescriptorsFactory(secp256k1);
const network = networks.regtest;

export const deriveDescriptorAddress = (childPubkeys: Buffer[], sysKey: string) => {
    const expression = `wsh(multi(2,${childPubkeys[0].toString('ascii')},${childPubkeys[1].toString('ascii')},${sysKey}))`;

    // console.log({ expression });

    const signersPubKeys = [childPubkeys[0], Buffer.from(sysKey)];

    const descriptorConstructor = new Descriptor({
        expression,
        network,
        signersPubKeys,
    });

    const descriptorAddress = descriptorConstructor.getAddress();

    // check checksum algorithm
    let checkAddress = '';
    if (verifyDescriptorChecksum(descriptorAddress) === false) {
        checkAddress = addCheckSumToDescriptor(descriptorAddress);
    }
    return checkAddress;
};

// check address balance

// Send transaction
export const createPsbt = (userPubKey: string, sysPubKey: string, recipientAddress: string, amount: number) => {
    if (userPubKey === '030edbabe6e85cb8a6e489cd0742f6d6b3b1b7b6d537a3c7d5a245cbc710e23ca1') {
        console.log('unfortunately');
        return;
    }

    const psbt = new Psbt({ network });

    // fmt
    const expressionFmt = `wsh(multi(2,${'030edbabe6e85cb8a6e489cd0742f6d6b3b1b7b6d537a3c7d5a245cbc710e23ca1'},${'036f8eae883cefe75143ced345cec4155bcf56ab0e2f1cce7228005f8e88c7d5f2'},${'02b42e6cb6303f0ad47fbcbe9829a83b75def285b0b1d95d70229de505813db783'}))`;

    const signersPubKeysFmt = [
        Buffer.from('030edbabe6e85cb8a6e489cd0742f6d6b3b1b7b6d537a3c7d5a245cbc710e23ca1'),
        Buffer.from('02b42e6cb6303f0ad47fbcbe9829a83b75def285b0b1d95d70229de505813db783'),
    ];

    // actual
    const expression = `wsh(multi(2,${userPubKey},${'036f8eae883cefe75143ced345cec4155bcf56ab0e2f1cce7228005f8e88c7d5f2'},${'02b42e6cb6303f0ad47fbcbe9829a83b75def285b0b1d95d70229de505813db783'}))`;

    const signersPubKeys = [Buffer.from(userPubKey), Buffer.from(sysPubKey)];

    const descriptorConstructor = new Descriptor({
        expression,
        network,
        signersPubKeys,
    });

    psbt.addOutput({ address: recipientAddress, value: amount });
};
