import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomButton from './CustomButton';
import PassPhrase from './PassPhrase';

export interface PassPhaseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const PassPhaseDrawer = ({ isOpen, onClose }: PassPhaseDrawerProps) => {
    const btnRef = React.useRef(null);

    return (
        <Box ref={btnRef}>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Insert Passcode</DrawerHeader>
                    <DrawerBody>
                        <PassPhrase />
                    </DrawerBody>
                    <DrawerFooter>
                        <HStack>
                            <CustomButton backgroundColor='transparent' border='1px solid #0000b3' color='black' onClick={onClose}>
                                Cancel
                            </CustomButton>
                            <CustomButton backgroundColor='#0000b3' onClick={() => '/history'}>
                                Go to History
                            </CustomButton>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default PassPhaseDrawer;
