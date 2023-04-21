import React, { useState } from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import WalletBalance from './components/WalletBalance';
import SendTransaction from './components/DepositSection';
import PassPhaseDrawer from './components/PassPhraseDrawer';
import SideNavigation from './components/SideNavigation';
import ReceiveSection from './components/ReceiveSection';
import { useBitcoinContext } from './contexts/bitcoin-context';

const Home = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [tabSwitch, setTabSwitch] = useState({
        deposit: true,
        recieve: false,
    });
    const {} = useBitcoinContext();

    return (
        <>
            <Flex>
                <SideNavigation />
                <Box borderRight='1px solid #2d2d2d' padding='40px' width='100%' height='100vh'>
                    <Flex flexDir='column' width='100%'>
                        <Text pb='16px' color='#2d2d2d' fontWeight='600' fontSize='24px'>
                            Wallet 
                        </Text>
                        <WalletBalance />
                        <>
                            <>
                                <>
                                    {tabSwitch.deposit && (
                                        <SendTransaction
                                            onClickTitle={() => setTabSwitch({ ...tabSwitch, deposit: false, recieve: true })}
                                            depositCallback={() => setOpenDrawer(true)}
                                        />
                                    )}
                                </>
                                <>
                                    {tabSwitch.recieve && (
                                        <ReceiveSection onClickTitle={() => setTabSwitch({ ...tabSwitch, deposit: true, recieve: false })} />
                                    )}
                                </>
                            </>
                        </>
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
            {openDrawer && <PassPhaseDrawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />}
        </>
    );
};

export default Home;
