import React from 'react';
import { HStack, Link } from '@chakra-ui/react';
import Image from 'next/image';

export interface SideNavLinkProps {
    src: string;
    linkLabel: string;
    href?: string;
    onClick?: () => void;
}

const SideNavLink = ({ src, linkLabel, href, onClick }: SideNavLinkProps): JSX.Element => {
    return (
        <>
            <HStack
                onClick={onClick}
                cursor='pointer'
                _hover={{ bgColor: '#f5f5ff', borderLeft: '4px solid #0000b3' }}
                gap='8px'
                borderRadius='8px'
                padding='16px'
            >
                <Image src={src} alt='check mark' />
                <Link _hover={{ opacity: 1.0, color: '#000000' }} onClick={onClick} href={href} fontSize='18px' fontWeight='500'>
                    {linkLabel}
                </Link>
            </HStack>
        </>
    );
};

export default SideNavLink;
