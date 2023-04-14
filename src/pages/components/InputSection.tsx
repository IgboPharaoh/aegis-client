import React, { useState, ChangeEvent } from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import padlockOpen from 'public/padlock-open.svg';
import padlockClose from 'public/padlock-close.svg';
import Image from 'next/image';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export interface InputSectionProps {
    email: string;
    password: string;
    error: string;
    isLoading: boolean;
    buttonLabel: string;
    pageTitle: string;
    pageCopyText: string;
    onClickButton: () => void;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputSection = ({
    email,
    password,
    isLoading,
    error,
    onClickButton,
    buttonLabel,
    pageTitle,
    pageCopyText,
    handleInputChange,
}: InputSectionProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box bgColor='#f5f8ff' width='100%' height='100vh'>
            <Flex flexDir='column' height='100%' justifyContent='center' alignItems='center'>
                <Box width={'50%'}>
                    <Text color='black' fontWeight='700' fontSize='48px'>
                        {pageTitle}
                    </Text>
                    <Text opacity='0.85' fontSize='16px'>
                        {pageCopyText}{' '}
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
                            onClick={onClickButton}
                            width={{ base: '100%', md: '100%', lg: '100%' }}
                            borderRadius='4px'
                            isLoading={isLoading}
                        >
                            {buttonLabel}
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
    );
};

export default InputSection;
