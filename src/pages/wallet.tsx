import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, HStack, Stack } from '@chakra-ui/react';
import padlockOpen from 'public/padlock-open.svg';
import padlockClose from 'public/padlock-close.svg';
import Image from 'next/image';
import SideNavigation from './components/SideNavigation';
import { useBitcoinContext } from './contexts/bitcoin-context';

export const MnenomicWord = ({ word }: { word: string }) => {
    return (
        <Box>
            <Box cursor='pointer' p='12px 12px' w='fit-content' borderRadius='8px' bgColor='#0000b3'>
                <Text whiteSpace='nowrap' fontWeight='600' fontSize='15px' color='#ffffff'>
                    {word}
                </Text>
            </Box>
        </Box>
    );
};

const Wallet = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { mnemonic } = useBitcoinContext();
    const word = mnemonic.split(' ');

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <Flex>
                <SideNavigation width='25%' />
                <Box borderRight='1px solid #2d2d2d' padding='40px' width='100%' height='100vh'>
                    <Flex flexDir='column' width='100%'>
                        <Text pb='16px' color='#2d2d2d' fontWeight='600' fontSize='24px'>
                            Wallet
                        </Text>
                        <Box>
                            <HStack cursor='pointer' onClick={() => setShowPassword(!showPassword)} width='fit-content'>
                                <Text>{showPassword ? 'Hide mnemonics' : 'Show mnemonics'}</Text>
                                <Image src={showPassword ? padlockClose : padlockOpen} alt='check mark' />
                            </HStack>
                            {showPassword && (
                                <>
                                    <Flex mt='24px' gap='16px'>
                                        {word.slice(0, 8).map((word) => (
                                            <Box key={word}>
                                                <MnenomicWord word={word} />
                                            </Box>
                                        ))}
                                    </Flex>
                                    <Flex mt='24px' gap='16px'>
                                        {word.slice(8, 16).map((word) => (
                                            <Box key={word}>
                                                <MnenomicWord word={word} />
                                            </Box>
                                        ))}
                                    </Flex>
                                    <Flex mt='24px' gap='16px'>
                                        {word.slice(16).map((word) => (
                                            <Box key={word}>
                                                <MnenomicWord word={word} />
                                            </Box>
                                        ))}
                                    </Flex>
                                </>
                            )}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export default Wallet;
