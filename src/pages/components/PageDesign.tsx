import { Flex, Center, Box, Text } from '@chakra-ui/react';
import React from 'react';
import CommaComponent from './CommaComponent';

const PageDesign = () => {
    return (
        <Box bgColor='#0000b3' width='100%' height='100vh'>
            <Flex flexDir='column' height='100%' justifyContent='center' alignItems='center'>
                <Box>
                    <Flex>
                        <Box mt='-64px' mr='-30px'>
                            <CommaComponent />
                        </Box>
                        <Box>
                            <Text color='#ffffff' fontWeight='700' fontSize='72px'>
                                Protect your
                            </Text>
                            <Text lineHeight='64px' color='#ffffff' fontWeight='700' fontSize='72px'>
                                Funds.
                            </Text>
                            <Flex pt='72px' alignItems='flex-start' gap='36px'>
                                <Box ml='6px' mt='12px' opacity='0.75' bgColor='#ffffff' h='1px' w='64px'></Box>
                                <Box>
                                    <Text lineHeight='32px' w='400px' color='#ffffff'>
                                        Using Aegis has given me the opportunity to secure and take control of my coins, using different plans to
                                        better manage my finances
                                    </Text>
                                    <Flex pt='36px' gap='16px'>
                                        <Center fontWeight='700' color='#ffffff' borderRadius='32px' w='48px' h='48px' bgColor='black'>
                                            TC
                                        </Center>
                                        <Box>
                                            <Text fontWeight='700' color='#ffffff'>
                                                Tobechukwu Chukwuleta
                                            </Text>
                                            <Text fontSize='12px' color='#ffffff'>
                                                Lightning Engineer
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default PageDesign;
