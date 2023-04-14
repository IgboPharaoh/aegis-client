import { useState } from 'react';

export const useDepositTransactionHook = () => {
    const [sendTransaction, setSendTransaction] = useState({
        address: '',
        amount: 0,
    });

    return {
        sendTransaction,
        setSendTransaction,
    };
};
