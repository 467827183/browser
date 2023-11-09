import { Box, Flex, Link, Skeleton, Tooltip } from '@chakra-ui/react';
import _ from 'lodash';
import Image from 'next/image';
import React from 'react';

import SearchBar from 'ui/snippets/searchBar/SearchBar';

import { bigNumberToBalance, formatAccount, formatBalance } from '../../../common';
import config from '../../../configs/app';
import useApiQuery, { getResourceKey } from '../../../lib/api/useApiQuery';
import getBlockTotalReward from '../../../lib/block/getBlockTotalReward';
import useTimeAgoIncrement from '../../../lib/hooks/useTimeAgoIncrement';
import { BLOCK } from '../../../stubs/block';
import { HOMEPAGE_STATS } from '../../../stubs/stats';
import { TX } from '../../../stubs/tx';
import ChainIndicators from '../../home/indicators/ChainIndicators';

import StatsGasPrices from '../../home/StatsGasPrices';
import styles from './index.module.scss';
import useIsMobile from '../../../lib/hooks/useIsMobile';
import { MEDIUM_LINK } from '../../../common/constant';
import { useQueryClient } from '@tanstack/react-query';
import { SocketMessage } from '../../../lib/socket/types';
import { Block } from '../../../types/api/block';
import useSocketChannel from '../../../lib/socket/useSocketChannel';
import useSocketMessage from '../../../lib/socket/useSocketMessage';
import useNewTxsSocket from '../../../lib/hooks/useNewTxsSocket';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Top></Top>
      <Summary></Summary>
      <BlocksAndTransactions></BlocksAndTransactions>
    </div>
  );
}

function Top() {
  return (
    <div className={ styles.header }>
      <div className={styles.top}>
        <div className={ styles.container_chain_name }>
          <div className={ styles.icon_match }>
            <Image src="/assets/icon_match.png" alt="icon_match" fill={ true }></Image>
          </div>
          <h1>Match Chain (Test)</h1>
        </div>
        <ul className={ styles.container_social }>
          <li>
            <a href={MEDIUM_LINK.medium}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.discord}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.twitter}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.telegram}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.linktree}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.reddit}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.mirror}></a>
          </li>
          <li>
            <a href={MEDIUM_LINK.github}></a>
          </li>
          {/*<li>*/}
          {/*  <a href={MEDIUM_LINK.youtub}></a>*/}
          {/*</li>*/}
        </ul>
      </div>
      <p>Match is an innovative Web3 social graph that operates on the Cosmos with a focus on decentralization and composability. It empowers users with
                data sovereignty and provides Web3 developers with infrastructure to build novel and user-friendly DApps permissionlessly.</p>
      <Box w={{base:"100%",lg:'50%'}}>
          <SearchBar></SearchBar>
      </Box>
    </div>
  );
}

function Summary() {
  return (
    <div className={ styles.summary }>
      <h3>Summary</h3>
      <div className={ styles.content }>
        <div className={ styles.data }>
          <div>
            <span>SBT</span>
            <p>297K+</p>
          </div>
          <div>
            <span>Dau</span>
            <p>10K+</p>
          </div>
          <div>
            <span>Mau</span>
            <p>300K+</p>
          </div>
        </div>
        <Stats></Stats>
        <ChainIndicators/>
      </div>
    </div>
  );
}

function Stats() {
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_stats', {
    queryOptions: {
      placeholderData: HOMEPAGE_STATS,
    },
  });
  return (
    <div className={ styles.info }>
      <div className={ styles.container_item }>
        <div>
          <div className={ styles.icon }>
            <Image src="/assets/icon_transactions.png" fill={ true } alt="icon_transactions"></Image>
          </div>
          <StatsItem
            isLoading={ isPlaceholderData }
            title="Total Transactions"
            data1={ Number(_.get(data, [ 'total_transactions' ], 0)).toLocaleString() }
          ></StatsItem>

        </div>
        <div>
          <div className={ styles.icon }>
            <Image src="/assets/icon_blocks.png" fill={ true } alt="icon_blocks"></Image>
          </div>
          <StatsItem
            isLoading={ isPlaceholderData }
            title="Total Blocks"
            data1={ Number(_.get(data, [ 'total_blocks' ], 0)).toLocaleString() }
            data2={ `(${ (_.get(data, [ 'average_block_time' ], 0) / 1000).toFixed(1) } s)` }
          ></StatsItem>
        </div>
      </div>
      <div className={ styles.line }></div>
      <div className={ styles.container_item }>
        <div>
          <div className={ styles.icon }>
            <Image src="/assets/icon_gas_price.png" fill={ true } alt="icon_gas_price"></Image>
          </div>
          <div>
            <p>GAS Price</p>
            { isPlaceholderData ? <Skeleton height="20px"/> : (
              <Tooltip label={ (
                <StatsGasPrices gasPrices={ _.get(data, [ 'gas_prices' ], {
                  average: 0,
                  fast: 0,
                  slow: 0,
                }) || {
                    average: 0,
                    fast: 0,
                    slow: 0,
                }}/>
              ) }>
                <p className={ styles.color_main }>{ `${ Number(_.get(data, [ 'gas_prices', 'average' ], 0)).toLocaleString() } Gwei` }</p>
              </Tooltip>
            ) }
          </div>
        </div>
        <div>
          <div className={ styles.icon }>
            <Image src="/assets/icon_wallet_address.png" fill={ true } alt="icon_wallet_address"></Image>
          </div>
          <StatsItem
            isLoading={ isPlaceholderData }
            title="Wallet addresses"
            data2={ Number(_.get(data, [ 'total_addresses' ], 0)).toLocaleString() }
          ></StatsItem>
        </div>
      </div>
    </div>
  );
}

function StatsItem({ isLoading, data1, data2, title }: { isLoading?: boolean; data1?: string; data2?: string; title: string }) {
  return (
    <div>
      <p>{ title }</p>
      { isLoading ? <Skeleton height="20px"/> : <p>{ data1 }<span className={ styles.color_main }>{ data2 }</span></p> }
    </div>
  );
}
function BlocksAndTransactions() {
  return (
    <div className={ styles.container_bottom }>
      <Blocks></Blocks>
      <Transactions></Transactions>
    </div>
  );
}

function Blocks() {
    const blocksMaxCount = 4
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_blocks', {
    queryOptions: {
      placeholderData: Array(blocksMaxCount).fill(BLOCK),
    },
  });
    const queryClient = useQueryClient();

    const handleNewBlockMessage: SocketMessage.NewBlock['handler'] = React.useCallback((payload) => {
        queryClient.setQueryData(getResourceKey('homepage_blocks'), (prevData: Array<Block> | undefined) => {

            const newData = prevData ? [ ...prevData ] : [];

            if (newData.some((block => block.height === payload.block.height))) {
                return newData;
            }

            return [ payload.block, ...newData ].sort((b1, b2) => b2.height - b1.height).slice(0, blocksMaxCount);
        });
    }, [ queryClient, blocksMaxCount ]);

    const channel = useSocketChannel({
        topic: 'blocks:new_block',
        isDisabled: isPlaceholderData || isError,
    });
    useSocketMessage({
        channel,
        event: 'new_block',
        handler: handleNewBlockMessage,
    });
  return (
    <div className={ styles.blocks }>
      <div className={ styles.blocks_header }>
        <div className={ styles.icon }>
          <Image src="/assets/icon_blocks.png" fill={ true } alt="icon_blocks"></Image>
        </div>
        <h3>Blocks</h3>
        <div className={ styles.icon_arrow }>
          <Image src="/assets/icon_arrow_right.png" fill={ true } alt="icon_arrow_right"></Image>
        </div>
      </div>
      <ul className={ styles.ul_blocks }>
        { data?.slice(0,4).map((item, index) => {
          return (
            <BlockItem key={ 'block_item_' + index } data={ item } isLoading={ isPlaceholderData }></BlockItem>
          );
        }) }
      </ul>
      <Link href="/blocks" className={ styles.view_all }>View all blocks</Link>
    </div>
  );
}
function BlockItem({ data, isLoading }: {
  data: typeof BLOCK;
  isLoading: boolean;
}) {
  const timeAgo = useTimeAgoIncrement(data.timestamp, !isLoading);
  const totalReward = getBlockTotalReward(data);
  const isMobile = useIsMobile()
  return (
    <li >
      <div className={ styles.flag }>BK</div>
      <div className={ styles.size }>
        <Link className={ styles.block_number } href={ `/block/${ data.height }` }>{ data.height }</Link>
        <span className={ styles.time }>{ timeAgo }</span>
      </div>
      <div className={ styles.miner }>
        <p>Validated By Validator: <Tooltip label={ data.miner.hash }><Link href={ `/address/${ data.miner.hash }` } className={styles.hash}>{ isMobile?formatAccount(data.miner.hash):data.miner.hash }</Link></Tooltip> </p>
        {/*<Skeleton isLoaded={ !isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">*/}
        {/*  { data.miner.hash }*/}
        {/*</Skeleton>*/}
        <span className={ styles.time }>{ data.tx_count } Transactions</span>
        <span className={ styles.time }>{ timeAgo }</span>
      </div>
      <div className={ styles.reward }>{ formatBalance(totalReward.toString()) }MAT</div>
    </li>
  );
}
function Transactions() {
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_txs', {
    queryOptions: {
      placeholderData: Array(4).fill(TX),
    },
  });
    const { num, socketAlert } = useNewTxsSocket();
  return (
    <div className={ styles.transactions }>
      <div className={ styles.blocks_header }>
        <div className={ styles.icon }>
          <Image src="/assets/icon_transactions.png" fill={ true } alt="icon_transactions"></Image>
        </div>
        <h3>Transactions</h3>
        <div className={ styles.icon_arrow }>
          <Image src="/assets/icon_arrow_right.png" fill={ true } alt="icon_arrow_right"></Image>
        </div>
      </div>
      <ul className={ styles.ul_transactions }>
        { data?.slice(0,4).map((item, index) => {
          return (
            <TransactionItem key={ 'transaction_item_' + index } data={ item } isLoading={ isPlaceholderData }></TransactionItem>
          );
        }) }
      </ul>
      <Link href="/txs" className={ styles.view_all }>View all transactions</Link>
    </div>
  );
}
function TransactionItem({ data, isLoading }: {
  data: typeof TX;
  isLoading: boolean;
}) {
  const timeAgo = useTimeAgoIncrement(data.timestamp, !isLoading);
  const isMobile = useIsMobile()
  return (
    <li >
      <div className={ styles.flag }>TX</div>
      <div className={ styles.size }>
        <Tooltip label={ data.hash }><Link href={ `/tx/${ data.hash }` } className={ styles.hash }>{ data.hash }</Link></Tooltip>
        <span className={ styles.time }>{ timeAgo }</span>
        { /*<span>{ formatBalance(totalReward.toString()) }MAT</span>*/ }
      </div>
        {isMobile && <div></div>}
      <div className={ styles.miner }>
        <p>From:
          <Tooltip label={ _.get(data, [ 'from', 'hash' ], '') }>
          <Link href={ `/address/${ _.get(data, [ 'from', 'hash' ], '') }` } className={ styles.hash }>{ _.get(data, [ 'from', 'hash' ], '') }</Link>
        </Tooltip>
        </p>
        <p>To: <Tooltip label={ _.get(data, [ 'to', 'hash' ], '') }>
          <Link href={ `/address/${ _.get(data, [ 'to', 'hash' ], '') }` } className={ styles.hash }>{ _.get(data, [ 'to', 'hash' ], '') }</Link>
        </Tooltip> </p>
      </div>
      <div className={ styles.block }>
        <p>Block</p>
        <Link href={ `/block/${ data.block }` }>#{ data.block }</Link>
        <span className={ styles.time }>{ timeAgo }</span>
      </div>
    </li>
  );
}
