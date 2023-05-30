import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useCreatePsbtTransaction } from '../hooks/useCreatePsbtTransaction';

export interface DepositTransactionProps {
    depositCallback: () => void;
    onClickTitle: () => void;
}

const DepositTransaction = ({ depositCallback, onClickTitle }: DepositTransactionProps) => {
    const { setAddress, setAmount, address, amount } = useCreatePsbtTransaction();

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
                        value={address}
                        onChange={() => setAddress(address)}
                        name='address'
                        type='text'
                    />
                    <CustomInput
                        labelName='Amount'
                        placeholder='Enter the amount you want to send'
                        value={amount}
                        onChange={() => setAmount(amount)}
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
