import React, { ReactNode } from 'react';
import { InputGroup, Text, Input, InputRightElement, Flex, Box } from '@chakra-ui/react';

export type InputProps = {
    labelName: string;
    placeholder: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: React.HTMLInputTypeAttribute;
    children?: ReactNode;
};

const CustomInput = ({ children, labelName, ...props }: InputProps) => {
    return (
        <InputGroup flexDir='column'>
                <Text fontSize='14px' color='#2d2d2d' opacity={'85%'} fontWeight='500' mb='4px'>
                    {labelName}
                </Text>
                <InputGroup>
                    <Input border='1px solid #2d2d2d' height='48px' _placeholder={{ color: '#2d2d2d', opacity: '50%' }} {...props} />
                    <InputRightElement pt='8px'>{children}</InputRightElement>
                </InputGroup>
        </InputGroup>
    );
};

export default CustomInput;
