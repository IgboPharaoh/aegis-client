import React, { useState } from 'react';
import dashboard from 'public/dashboard.svg';
import transactions from 'public/transactions.svg';
import wallets from 'public/wallets.svg';
import settings from 'public/settings.svg';
import logout from 'public/logout.svg';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import SideNavLink from './components/SideNavLink';
import WalletBalance from './components/WalletBalance';
import SendTransaction from './components/DepositSection';
import LogoutModal from './components/LogoutModal';
import PassPhrase from './components/PassPhrase';
import PassPhaseDrawer from './components/PassPhraseDrawer';

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Flex>
                <Flex borderRight='1px solid #2d2d2d' pt='42px' flexDir='column' width='50%' height='100vh' justifyContent='space-between'>
                    <Stack spacing='40px' p='40px'>
                        <SideNavLink src={dashboard} linkLabel='Dashboard' href='/home' />
                        <SideNavLink src={transactions} linkLabel='Transactions' href='/transactions' />
                        <SideNavLink src={wallets} linkLabel='Wallets' href='/wallets' />
                        <SideNavLink src={settings} linkLabel='Settings' href='/settings' />
                    </Stack>
                    <Box pb='40px' pl='40px'>
                        <SideNavLink src={logout} linkLabel='Logout' onClick={() => setOpenModal(true)} />
                    </Box>
                </Flex>

                <Box borderRight='1px solid #2d2d2d' padding='40px' width='100%' height='100vh'>
                    <Flex flexDir='column' width='100%'>
                        <Text pb='16px' color='#2d2d2d' fontWeight='600' fontSize='24px'>
                            Wallet
                        </Text>
                        <WalletBalance />
                        <SendTransaction depositCallback={() => setOpenDrawer(true)} />
                    </Flex>
                </Box>

                <Box width='100%' height='100vh'>
                    <Stack padding='40px'>
                        <Text color='#2d2d2d' fontWeight='600' fontSize='24px'>
                            Transaction History
                        </Text>
                        <Text> Unfortunately no transactions are linked to this address</Text>
                    </Stack>
                </Box>
            </Flex>
            {openModal && <LogoutModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
            {openDrawer && <PassPhaseDrawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />}
        </>
    );
};

export default Home;
