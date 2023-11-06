import { Flex, chakra } from '@chakra-ui/react';
import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';
interface Props {
  className?: string;
  children: React.ReactNode;
}

const MainColumn = ({ children, className }: Props) => {
  return (
    <Flex
      className={ classNames(className, styles.container) }
      flexDir="column"
      flexGrow={ 1 }
      w={{ base: '100%', lg: 'auto' }}
      // paddingX={{ base: 4, lg: 12 }}
      // paddingTop={{ base: '138px', lg: 9 }}
      // paddingBottom={ 10 }
    >
      { children }
    </Flex>
  );
};

export default React.memo(chakra(MainColumn));
