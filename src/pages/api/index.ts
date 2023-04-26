import { Axios, AxiosResponse } from 'axios';
import { Network } from 'bitcoinjs-lib';

const axios = new Axios({
    baseURL: 'https://blockstream.info/api/',
});
export const fetchUtxosFromAddress = async (address?: string, network?: Network) => {
    if (!address) {
        throw new Error('you cannot carryout this transaction without an address');
    }

    try {
        const { data }: AxiosResponse = await axios.get(`address/${address}/utxos`);
        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const broadcastTransaction = () => {};
