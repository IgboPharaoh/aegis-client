import { networks, Psbt } from 'bitcoinjs-lib';
import { useState } from 'react';
import { fetchUtxosFromAddress } from '../api';

const network = networks.regtest;

export const useCreatePsbtTransaction = () => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);

    const createPsbtTransaction = (changeAddress: string) => {
        const FEE_IN_SATS = 500;

        const utxos = fetchUtxosFromAddress(changeAddress);

        if (!amount) {
            throw new Error(`Amount cannot be empty and must be a number`);
        }

        if (!address) {
            throw new Error(`Address cannot be empty and must be a number`);
        }
        const psbt = new Psbt({ network });
    };

    return {
        setAmount,
        setAddress,
        amount,
        address,
    };
};
