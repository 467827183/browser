import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './index.module.scss';
export default function Header() {
  const pathname = usePathname();
  return (
    <div className={ styles.container }>
      <Link href="/" className={ styles.logo }>
        <Image src="/assets/logo.png" fill={ true } alt="logo"></Image>
      </Link>
      <div className={ styles.container_right }>
        <ul className={ styles.menu }>
          <li className={ classNames({ [styles.active]: pathname === '/' }) }>
            <Link href="/">Homepage</Link>
          </li>
          <li>
            <span>Blockchain</span>
            <div className={ styles.icon }></div>
            <div className={ styles.drop }>
              <ul className={ styles.sub_menu }>
                <ul>
                  <li>
                    <p>Blocks</p>
                  </li>
                  <li>
                    <Link href="/blocks">All</Link>
                  </li>
                  <li>
                    <Link href={{
                      pathname: '/blocks',
                      query: { tab: 'reorgs' },
                    }}>Forked</Link>
                  </li>
                  <li>
                    <Link href={{
                      pathname: '/blocks',
                      query: { tab: 'uncles' },
                    }}>Uncles</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>Transactions</p>
                  </li>
                  <li>
                    <Link href="/txs">Mined</Link>
                  </li>
                  <li>
                    <Link href={{
                      pathname: '/txs',
                      query: { tab: 'pending' },
                    }}>Pending</Link>
                  </li>
                </ul>
                <li>
                  <Link href="/verified-contracts" className={ styles.verified }>Verified Contracts</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={ classNames({ [styles.active]: pathname === '/tokens' }) }>
            <Link href="/tokens">Tokens</Link>
          </li>
          <li>
            <span>APIs</span>
            <div className={ styles.icon }></div>
            <div className={ styles.drop }>
              <ul className={ styles.sub_menu }>
                <ul>
                  <li>
                    <p>APIs</p>
                  </li>
                  <li>
                    <Link href="/api-docs">REST API</Link>
                  </li>
                  <li>
                    <Link href="/graphiql">GraphQL</Link>
                  </li>
                </ul>
              </ul>
            </div>
          </li>
        </ul>
        <span className={ styles.chain_name }>Match Chain</span>
      </div>
    </div>
  );
}
