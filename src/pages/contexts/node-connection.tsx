import axios from 'axios';
import { createContext, memo, ReactNode, useContext, useEffect, useState } from 'react';
import { NodeConnectionProps } from '../interfaces';
import { verifyDescriptorChecksum } from '../utils/bitcoin-utils';
import { useBitcoinContext } from './bitcoin-context';

const NodeConnectionState: NodeConnectionProps = {
    response: {},
    descriptorAddress: {},
};

const NodeConnectionContext = createContext<NodeConnectionProps>(NodeConnectionState);

export const NodeConnectionContextProvider = memo(function NodeConnectionContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const [descriptorAddress, setDescriptorAddress] = useState<any>();
    const [response, setResponse] = useState<any>();
    const { descriptorWithChecksum } = useBitcoinContext();
    const validateChecksum = verifyDescriptorChecksum(descriptorWithChecksum);
    console.log('descirptor with checksum:', descriptorWithChecksum);
    console.log('descriptor address from api:', descriptorAddress);

    return <NodeConnectionContext.Provider value={{ response, descriptorAddress }}>{children}</NodeConnectionContext.Provider>;
});

export const useNodeConnectionContext = () => {
    return useContext(NodeConnectionContext);
};
