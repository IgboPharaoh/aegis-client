import React, { ChangeEvent, useState } from 'react';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Digit from './Digit';
import checkMark from 'public/check-mark.svg';
import padlock from 'public/padlock.svg';
import digitDelete from 'public/digit-delete.svg';

const PassPhrase = () => {
    const [passPhrase, setPassPhrase] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.target;
        /**
         * todo: modify button to pass values to input
         */
        setPassPhrase(value);
        console.log(passPhrase, 'pass phrase');
    };

    return (
        <Box w='fit-content' p='16px'>
            <Box mb='24px'>
                <Flex mb='8px' justifyContent='center' alignItems='center'>
                    <>
                        <Image src={padlock} width={12} alt='padlock' /> <Text fontSize='12px'>Passcode</Text>
                    </>
                </Flex>
                <Input
                    fontFamily='monospace'
                    placeholder='******'
                    value={passPhrase}
                    type='number'
                    _placeholder={{ color: 'black' }}
                    onChange={handleChange}
                />
            </Box> 
            <Box
                display='grid'
                gridTemplateColumns='repeat(3, 4rem)'
                gridTemplateRows='repeat(3, 2.5rem)'
                rowGap='32px'
                columnGap='24px'
                placeContent='center'
            >
                <Digit onClick={() => {}}>1</Digit>
                <Digit onClick={() => {}}>2</Digit>
                <Digit onClick={() => {}}>3</Digit>
                <Digit onClick={() => {}}>4</Digit>
                <Digit onClick={() => {}}>5</Digit>
                <Digit onClick={() => {}}>6</Digit>
                <Digit onClick={() => {}}>7</Digit>
                <Digit onClick={() => {}}>8</Digit>
                <Digit onClick={() => {}}>9</Digit>

                <Digit bgColor='white' border='1px solid #1b2c2d2c' onClick={() => {}}>
                    <Image src={digitDelete} alt='check mark' />
                </Digit>
                <Digit onClick={() => {}}>0</Digit>
                <Digit bgColor='white' border='1px solid #1b2c2d2c' onClick={() => {}}>
                    <Image src={checkMark} alt='check mark' />
                </Digit>
            </Box>
            <Flex mt='2rem' justifyContent='center'></Flex>
        </Box>
    );
};

export default PassPhrase;
