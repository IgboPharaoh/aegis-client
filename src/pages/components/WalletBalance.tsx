import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const WalletBalance = () => {
    const [timer] = React.useState({ hours: new Date().getHours(), min: new Date().getMinutes() });

    return (
        <Box
            boxShadow=' rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;'
            bgColor='#0000b3'
            color='white'
            p='24px'
            textAlign='center'
            borderRadius='8px'
            height='fit-content'
        >
            <Text fontSize='14px' fontWeight='700'>
                Your wallet balance
            </Text>
            <Text pt='8px' pb='8px' fontSize='36px' fontWeight='800'>
                $ 50, 000, 000. 58
            </Text>
            {/* <Text opacity='0.8' fontWeight='500'>{`${new Date().toDateString()},  ${timer.hours} : ${timer.min}`}</Text> */}
            <Flex justifyContent='space-between' gap='32px' mt='24px' bgColor='#8484fb64' p='16px' borderRadius='8px'>
                <Flex cursor='pointer' borderRadius='8px' flexDir='column' bgColor='white' w='100%' h='48px' justifyContent='center'>
                    <Text color='black' fontWeight='600'>
                        Deposit
                    </Text>
                </Flex>
                <Flex cursor='pointer' justifyContent='center' borderRadius='8px' flexDir='column' bgColor='white' w='100%' h='48px'>
                    <Text color='black' fontWeight='600'>
                        Recieve
                    </Text>
                </Flex>
                <Flex cursor='pointer' justifyContent='center' borderRadius='8px' flexDir='column' bgColor='white' w='100%' h='48px'>
                    <Text color='black' fontWeight='600'>
                        Wallets
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default WalletBalance;
