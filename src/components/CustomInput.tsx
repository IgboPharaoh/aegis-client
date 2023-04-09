import React from 'react';
import { InputGroup, Text, Input } from '@chakra-ui/react';

export type InputProps = {
    labelName: string;
    placeholder: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: React.HTMLInputTypeAttribute;
};

const CustomInput = ({ labelName, ...props }: InputProps) => {
    return (
        <InputGroup flexDir='column'>
            <Text fontSize='14px' color='#2d2d2d' opacity={'85%'} fontWeight='500' mb='4px'>
                {labelName}
            </Text>
            <Input height='42px' _placeholder={{ color: '#2d2d2d', opacity: '50%' }} {...props} />
        </InputGroup>
    );
};

export default CustomInput;
