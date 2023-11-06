import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainArea = ({ children }: Props) => {
  return (
    <Box w="100%" minH="100vh" alignItems="stretch">
      { children }
    </Box>
  );
};

export default React.memo(MainArea);
