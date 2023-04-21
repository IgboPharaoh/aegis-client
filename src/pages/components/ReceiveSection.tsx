import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useBitcoinContext } from '../contexts/bitcoin-context';

const ReceiveSection = ({ onClickTitle }: { onClickTitle: () => void }) => {
    const { address } = useBitcoinContext();
    return (
        <Box mt='48px'>
            <Flex gap='8px'>
                <Text
                    opacity='0.7'
                    w='fit-content'
                    cursor='pointer'
                    onClick={onClickTitle}
                    pb='16px'
                    color='#2d2d2d'
                    fontWeight='600'
                    fontSize='32px'
                >
                    Deposit
                </Text>
                <Text fontWeight='600' fontSize='32px'>
                    /
                </Text>
                <Text
                    textDecor='underline'
                    w='fit-content'
                    cursor='pointer'
                    onClick={onClickTitle}
                    pb='16px'
                    color='#2d2d2d'
                    fontWeight='600'
                    fontSize='32px'
                >
                    Recieve
                </Text>
            </Flex>
            <Text mb='16px'>You can use any of this addresses to recieve funds</Text>
            <Box height='450px' overflow='scroll'>
                <Box>
                    {address.map((address, index) => (
                        <Box mb='16px' p='8px' borderRadius='8px' border='1px solid #2d2d2d' key={index}>
                            <Text>{address.address}</Text>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ReceiveSection;
