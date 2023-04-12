import { Flex } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import InputSection from './components/InputSection';
import PageDesign from './components/PageDesign';
import { useSignInHook } from './hooks/useSignInHook';

const SignIn = () => {
    const { loginData, setLoginData, email, password, error, isLoading, signInToAccount } = useSignInHook();

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            setLoginData((loginData) => ({ ...loginData, [event.target.name]: event.target.value }));
        },
        [loginData]
    );

    return (
        <div>
            <Flex>
                <InputSection
                    email={email}
                    password={password}
                    error={error}
                    isLoading={isLoading}
                    buttonLabel='Login to account'
                    pageTitle='Sign in'
                    pageCopyText='Must be nice to always be in control'
                    onClickButton={signInToAccount}
                    handleInputChange={handleInputChange}
                />
                <PageDesign />
            </Flex>
        </div>
    );
};

export default SignIn;
