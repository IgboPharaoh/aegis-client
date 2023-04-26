import React from 'react';
import { Flex, Text, Link, HStack } from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { useRouter } from 'next/router';

const Header = ({ onClick, buttonLabel = 'Create Account' }: { onClick: () => void; buttonLabel?: string }): JSX.Element => {
    const router = useRouter();
    return (
        <Flex ml='80px' mr='80px' gap='64px' justifyContent='space-between'>
            <HStack width='100%'>
                <Text
                    onClick={() => {
                        router.push('/');
                    }}
                    fontSize='24px'
                    fontWeight='600'
                    color='#0000b3'
                    cursor='pointer'
                >
                    Aegis
                </Text>
            </HStack>
            <HStack width='100%' justifyContent='flex-end'>
                <CustomButton onClick={onClick} backgroundColor='#000066' width={{ base: '150px' }} height='48px'>
                    {buttonLabel}
                </CustomButton>
            </HStack>
        </Flex>
    );
};

export default Header;
