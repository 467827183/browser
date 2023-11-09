import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import Header from 'ui/snippets/header/Header';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';

import * as Layout from './components';
import SearchBar from '../../snippets/searchBar/SearchBar';
import { Box } from '@chakra-ui/react';

const LayoutError = ({ children }: Props) => {
  return (
    <Layout.Container>
      <Layout.MainArea>
        <Layout.Header/>
        <Layout.MainColumn>
          <HeaderAlert/>
          <Header/>
          <AppErrorBoundary>
            <main>
              { children }
            </main>
          </AppErrorBoundary>
        </Layout.MainColumn>
      </Layout.MainArea>
      <Layout.Footer/>
    </Layout.Container>
  );
};

export default LayoutError;
