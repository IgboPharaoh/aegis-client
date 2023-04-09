import { Button, ResponsiveObject, ResponsiveValue } from '@chakra-ui/react';
import React from 'react';

export interface CustomButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    height?: string | number;
    borderRadius?: string | number;
    backgroundColor?: ResponsiveValue<string>;
    children?: React.ReactNode;
    p?: ResponsiveObject<string>;
    width?: ResponsiveObject<string>;
    fontSize?: ResponsiveObject<string>;
    border?: ResponsiveValue<string>;
    color?: ResponsiveValue<string>;
}

const CustomButton = ({ children, ...props }: CustomButtonProps): JSX.Element => {
    return (
        <div>
            <Button
                fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                p={{ base: '10px', md: '13px', lg: '16px' }}
                fontWeight='600'
                backgroundColor='#001247'
                borderRadius='32px'
                color='white'
                {...props}
            >
                {children}
            </Button>
        </div>
    );
};

export default CustomButton;
