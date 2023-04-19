import { Box, Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export interface DigitProps {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    bgColor?: string;
    border?: string;
}
const Digit = ({ children, bgColor = '#0000b3', ...props }: DigitProps) => {
    return (
        <>
            <Button height='48px' bgColor={bgColor} color='white' fontWeight='800' fontSize='18px' {...props}>
                {children}
            </Button>
        </>
    );
};

export default Digit;
