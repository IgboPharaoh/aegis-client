import React, { ChangeEvent, useCallback, useState } from 'react';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useDepositTransactionHook } from '../hooks/useDepositHook';

export interface DepositTransactionProps {
    depositCallback: () => void;
    onClickTitle: () => void;
}
const DepositTransaction = ({ depositCallback, onClickTitle }: DepositTransactionProps) => {
    const { sendTransaction, setSendTransaction } = useDepositTransactionHook();
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            setSendTransaction((sendTransaction) => ({ ...sendTransaction, [event.target.name]: event.target.value }));
        },
        [sendTransaction]
    );

    return (
        <div>
            <Box pt='48px'>
                <Flex gap='8px'>
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
                        Deposit
                    </Text>
                    <Text fontWeight='600' fontSize='32px'>
                        /
                    </Text>
                    <Text
                        w='fit-content'
                        cursor='pointer'
                        onClick={onClickTitle}
                        pb='16px'
                        color='#2d2d2d'
                        opacity='0.7'
                        fontWeight='600'
                        fontSize='32px'
                    >
                        Recieve
                    </Text>
                </Flex>
                <Stack spacing='24px'>
                    <CustomInput
                        labelName='Address'
                        placeholder='Enter the recipient address'
                        value={sendTransaction.address}
                        onChange={handleInputChange}
                        name='address'
                        type='text'
                    />
                    <CustomInput
                        labelName='Amount'
                        placeholder='Enter the amount you want to send'
                        value={sendTransaction.amount}
                        onChange={handleInputChange}
                        name='amount'
                        type='number'
                    />
                    <CustomButton onClick={depositCallback} width={{ base: '100%', md: '100%', lg: '100%' }} borderRadius='4px' isLoading={false}>
                        Proceed
                    </CustomButton>
                </Stack>
            </Box>
        </div>
    );
};

export default DepositTransaction;
