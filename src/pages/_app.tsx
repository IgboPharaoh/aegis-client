import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <main className={raleway.className}>
                <Component {...pageProps} />
            </main>
        </ChakraProvider>
    );
}
