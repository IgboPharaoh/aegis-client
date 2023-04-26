import React, { ChangeEvent, useCallback } from 'react';
import Header from '@/pages/components/Header';
import { Box, Flex } from '@chakra-ui/react';
import { useCreateAccountHook } from '@/pages/hooks/useCreateAccountHook';
import PageDesign from './components/PageDesign';
import InputSection from './components/InputSection';
import { useRouter } from 'next/router';

const SignUp = () => {
    const { loginData, setLoginData, email, password, error, createUserAccount, isLoading } = useCreateAccountHook();
    const router = useRouter();

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
                <Header onClick={() => router.push('/sign-in')}  buttonLabel="Login to Account" />
            </Box>
            <Flex>
                <InputSection
                    email={email}
                    password={password}
                    error={error}
                    isLoading={isLoading}
                    buttonLabel='Create an account'
                    pageTitle='Sign up'
                    pageCopyText='Take a bold step to secure your funds'
                    onClickButton={createUserAccount}
                    handleInputChange={handleInputChange}
                />
                <PageDesign />
            </Flex>
        </div>
    );
};

export default SignUp;
