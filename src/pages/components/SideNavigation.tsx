import React, { useState } from 'react';
import { Flex, Stack, Box } from '@chakra-ui/react';
import SideNavLink from './SideNavLink';
import dashboard from 'public/dashboard.svg';
import transactions from 'public/transactions.svg';
import wallets from 'public/wallets.svg';
import settings from 'public/settings.svg';
import logout from 'public/logout.svg';
import LogoutModal from './LogoutModal';

export interface SideNavigationProps {
    width?: string;
}

const SideNavigation = ({ width = '50%' }: SideNavigationProps) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Flex borderRight='1px solid #2d2d2d' pt='42px' flexDir='column' width={width} height='100vh' justifyContent='space-between'>
                <Stack spacing='40px' p='40px'>
                    <SideNavLink src={dashboard} linkLabel='Dashboard' href='/home' />
                    <SideNavLink src={transactions} linkLabel='Transactions' href='/transactions' />
                    <SideNavLink src={wallets} linkLabel='Wallets' href='/wallet' />
                    <SideNavLink src={settings} linkLabel='Settings' href='/settings' />
                </Stack>
                <Box pb='40px' pl='40px'>
                    <SideNavLink src={logout} linkLabel='Logout' onClick={() => setOpenModal(true)} />
                </Box>
            </Flex>
            {openModal && <LogoutModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
        </>
    );
};

export default SideNavigation;
