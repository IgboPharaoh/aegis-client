import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';
import { BitcoinContextProvider } from './contexts/bitcoin-context';

const raleway = Raleway({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'top-right' } }}>
            <main className={raleway.className}>
                <BitcoinContextProvider>
                        <Component {...pageProps} />
                </BitcoinContextProvider>
            </main>
        </ChakraProvider>
    );
}
