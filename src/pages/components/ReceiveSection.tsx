import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import QRCode from 'react-qr-code';

export interface ReceiveSectionProps {
    qrCode: string;
    address: string;
}

const ReceiveSection = ({ qrCode, address }: ReceiveSectionProps) => {
    return (
        <div>
            <Text pb='16px' color='#2d2d2d' fontWeight='600' fontSize='32px'>
                Deposit
            </Text>
            {qrCode ? (
                <Box>
                    <QRCode value={qrCode} height='256px' width='256px' />
                    <Text>{address}</Text>
                </Box>
            ) : null}
        </div>
    );
};

export default ReceiveSection;
