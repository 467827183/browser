import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import Header from 'ui/snippets/header/Header';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';

import * as Layout from './components';
import SearchBar from '../../snippets/searchBar/SearchBar';
import { Box } from '@chakra-ui/react';

const LayoutDefault = ({ children }: Props) => {
  return (
    <Layout.Container>
      <Layout.MainArea>
        <Layout.Header/>
        <Layout.MainColumn>
          <HeaderAlert/>
          {/*<Header/>*/}
          <AppErrorBoundary>
            <Box mb={{base:"24px",lg:0}}>
                <SearchBar></SearchBar>
            </Box>
            <Layout.Content>
              { children }
            </Layout.Content>
          </AppErrorBoundary>
        </Layout.MainColumn>
      </Layout.MainArea>
      <Layout.Footer/>
    </Layout.Container>
  );
};

export default LayoutDefault;
