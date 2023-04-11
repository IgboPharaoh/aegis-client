import React from 'react';
import Image from 'next/image';
import scale from 'public/scale.svg';
import { Box, Center, Flex } from '@chakra-ui/react';

const CommaComponent = () => {
    return (
        <Flex gap='12px' alignItems='center' flexDir='column'>
            <Center zIndex='100' borderRadius='32px' bgColor='#00b3b3' w='48px' h='48px'>
                <Image src={scale} alt='check mark' height='16' width='16' />
            </Center>
            <Box w='1px' pos='absolute' h='50%' opacity='0.75' bgColor='#ffffff'></Box>
        </Flex>
    );
};

export default CommaComponent;
