import React from 'react';
import { ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, Text, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { firebaseAuthApp } from '@/firebase';

export interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
    const toast = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogoutClick = () => {
        setIsLoading(true);
        const auth = getAuth(firebaseAuthApp);
        signOut(auth)
            .then(() => {
                toast({
                    title: 'Signed out!!.',
                    description: "You've been logged out of your account, you can always log in.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                router.push('/sign-in');
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: 'Error with Signing you out!!.',
                    description: "It's not you, it's us, you cannot be signed out at this moment.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
                setIsLoading(false);
            });
    };
    return (
        <div>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
                <ModalContent>
                    <ModalHeader>Logout</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text> You are about to logout from your account!</Text>
                    </ModalBody>
                    <ModalFooter gap='8px'>
                        <CustomButton height='40px' backgroundColor='transparent' color='black' border='1px solid #2d2d2d' onClick={onClose}>
                            Cancel
                        </CustomButton>
                        <CustomButton height='40px' isLoading={isLoading} onClick={handleLogoutClick}>
                            Proceed
                        </CustomButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default LogoutModal;
