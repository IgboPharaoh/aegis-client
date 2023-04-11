import React, { ChangeEvent, useCallback, useState } from 'react';
import Header from '@/pages/components/Header';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import CommaComponent from '@/pages/components/CommaComponent';
import CustomInput from '@/pages/components/CustomInput';
import CustomButton from '@/pages/components/CustomButton';
import { useCreateAccountHook } from '@/pages/hooks/useCreateAccountHook';
import Image from 'next/image';
import padlockOpen from 'public/padlock-open.svg';
import padlockClose from 'public/padlock-close.svg';

const SignUp = () => {
    const { loginData, setLoginData, email, password, error, createUserAccount, isLoading } = useCreateAccountHook();
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            setLoginData((loginData) => ({ ...loginData, [event.target.name]: event.target.value }));
        },
        [loginData]
    );

    return (
        <div>
            <Box mt='16px' width='100%' position='absolute'>
                <Header />
            </Box>
            <Flex>
                <Box bgColor='#f5f8ff' width='100%' height='100vh'>
                    <Flex flexDir='column' height='100%' justifyContent='center' alignItems='center'>
                        <Box width={'50%'}>
                            <Text color='black' fontWeight='700' fontSize='48px'>
                                Sign up
                            </Text>
                            <Text opacity='0.85' fontSize='16px'>
                                Take a bold step to secure your funds
                            </Text>
                            <Stack mt='80px' spacing='24px'>
                                <CustomInput
                                    labelName='Email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={handleInputChange}
                                    name='email'
                                    type='email'
                                />
                                <CustomInput
                                    labelName='Password'
                                    placeholder='choose a password'
                                    value={password}
                                    onChange={handleInputChange}
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    // eslint-disable-next-line react/no-children-prop
                                    children={
                                        <Box cursor='pointer'>
                                            <Image
                                                onClick={() => setShowPassword(!showPassword)}
                                                src={showPassword ? padlockClose : padlockOpen}
                                                alt='check mark'
                                            />
                                        </Box>
                                    }
                                />
                                <CustomButton
                                    onClick={createUserAccount}
                                    width={{ base: '100%', md: '100%', lg: '100%' }}
                                    backgroundColor='#0000b3'
                                    borderRadius='4px'
                                    height='48px'
                                    isLoading={isLoading}
                                >
                                    Create an account
                                </CustomButton>
                            </Stack>
                            {error && (
                                <Box pt='8px'>
                                    <Text textAlign='center' color='red' fontSize='14'>
                                        Error: {error}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
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
                                                Using Aegis has given me the opportunity to secure and take control of my coins, using different plans
                                                to better manage my finances
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
            </Flex>
        </div>
    );
};

export default SignUp;
