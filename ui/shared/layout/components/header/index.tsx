import { Flex } from '@chakra-ui/react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import useIsMobile from '../../../../../lib/hooks/useIsMobile';
import styles from './index.module.scss';
export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [ showMenu, setShowMenu ] = useState(true);
  const [ index, setIndex ] = useState(-1);
  useEffect(() => {
    if (isMobile) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [ isMobile ]);
  function toggleSubMenu(_index: number) {
    if (index >= 0) {
      setIndex(-1);
    } else {
      setIndex(_index);
    }
  }
  function closeSubMenu() {
    setIndex(-1);
    if (isMobile) {
      setShowMenu(false);
    }
  }
  return (
    <div className={ styles.container }>
      <Link href="/" >
        <img className={ styles.logo } src="/assets/logo.png" alt="logo"></img>
      </Link>
      { showMenu && (
        <div className={ styles.container_right }>
          <ul className={ styles.menu }>
            <li className={ classNames({ [styles.active]: pathname === '/' }) }>
              <Link href="/" className={ styles.name }>Homepage</Link>
            </li>
            <li className={ classNames({ [styles.active]: index === 1 }) } >
              <Flex alignItems="center" onClick={ () => toggleSubMenu(1) }>
                <span className={ styles.name }>Blockchain</span>
                <div className={ styles.icon }></div>
              </Flex>
              <div className={ classNames(styles.drop, { [ styles.d_block]: index === 1 }) }>
                <ul className={ styles.sub_menu } onClick={ closeSubMenu }>
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
            <li className={ classNames({ [styles.active]: index === 2 }) } >
              <Flex alignItems="center" onClick={ () => toggleSubMenu(2) }>
                <span className={ styles.name }>Tokens</span>
                <div className={ styles.icon }></div>
              </Flex>
              <div className={ classNames(styles.drop, { [ styles.d_block]: index === 2 }) }>
                <ul className={ styles.sub_menu } onClick={ closeSubMenu }>
                  <ul>
                    <li>
                      <p>Tokens</p>
                    </li>
                    <li>
                      <Link href="/tokens">All</Link>
                    </li>
                    <li>
                      <Link href="/accounts">MAT</Link>
                    </li>
                  </ul>
                </ul>
              </div>
            </li>
            { /*<li className={classNames({ [styles.active]: index===3 })} >*/ }
            { /*    <Flex alignItems={'center'} onClick={()=>toggleSubMenu(3)}>*/ }
            { /*    <span className={styles.name}>APIs</span>*/ }
            { /*    <div className={ styles.icon }></div>*/ }
            { /*    </Flex>*/ }
            { /*    <div className={classNames( styles.drop,{[ styles.d_block]:index===3}) }>*/ }
            { /*        <ul className={ styles.sub_menu } onClick={closeSubMenu}>*/ }
            { /*            <ul>*/ }
            { /*                <li>*/ }
            { /*                    <p>APIs</p>*/ }
            { /*                </li>*/ }
            { /*                <li>*/ }
            { /*                    <Link href="/api-docs">REST API</Link>*/ }
            { /*                </li>*/ }
            { /*                <li>*/ }
            { /*                    <Link href="/graphiql">GraphQL</Link>*/ }
            { /*                </li>*/ }
            { /*            </ul>*/ }
            { /*        </ul>*/ }
            { /*    </div>*/ }
            { /*</li>*/ }
          </ul>
          <span className={ styles.chain_name }>Match Chain</span>
        </div>
      ) }
      { isMobile && <img className={ styles.icon_menu } onClick={ () => setShowMenu(!showMenu) } alt="icon_menu" src={ `/assets/icon_${ showMenu ? 'close' : 'menu' }.png` }></img> }
    </div>
  );
}
