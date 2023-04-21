import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';
import { BitcoinContextProvider } from './contexts/bitcoin-context';
import { NodeConnectionContextProvider } from './contexts/node-connection';

const raleway = Raleway({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'top-right' } }}>
            <main className={raleway.className}>
                <BitcoinContextProvider>
                    <NodeConnectionContextProvider>
                        <Component {...pageProps} />
                    </NodeConnectionContextProvider>
                </BitcoinContextProvider>
            </main>
        </ChakraProvider>
    );
}
