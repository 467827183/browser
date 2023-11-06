import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import useIsMobile from '../../../../../lib/hooks/useIsMobile';
import { Flex } from '@chakra-ui/react';
export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile()
    const [showMenu,setShowMenu] = useState(true)
    const [index,setIndex] = useState(-1)
    useEffect(()=>{
        if(isMobile) {
            setShowMenu(false)
        }else {
            setShowMenu(true)
        }
    },[isMobile])
    function toggleSubMenu(_index:number){
      if(index>=0){
          setIndex(-1)
      }else {
          setIndex(_index)
      }
    }
  return (
    <div className={ styles.container }>
      <Link href="/" className={ styles.logo }>
        <Image src="/assets/logo.png" fill={ true } alt="logo"></Image>
      </Link>
        {showMenu && <div className={ styles.container_right }>
            <ul className={ styles.menu }>
                <li className={ classNames({ [styles.active]: pathname === '/' }) }>
                    <Link href="/" className={styles.name}>Homepage</Link>
                </li>
                <li className={classNames({ [styles.active]: index===1 })} onClick={()=>toggleSubMenu(1)}>
                    <Flex alignItems={'center'}>
                        <span className={styles.name}>Blockchain</span>
                        <div className={ styles.icon }></div>
                    </Flex>
                    <div className={classNames( styles.drop,{[ styles.d_block]:index===1}) }>
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
                    <Link href="/tokens" className={styles.name}>Tokens</Link>
                </li>
                <li className={classNames({ [styles.active]: index===3 })} onClick={()=>toggleSubMenu(3)}>
                    <Flex alignItems={'center'}>
                    <span className={styles.name}>APIs</span>
                    <div className={ styles.icon }></div>
                    </Flex>
                    <div className={classNames( styles.drop,{[ styles.d_block]:index===3}) }>
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
        </div>}
      {isMobile && <div className={styles.icon_menu} onClick={()=>setShowMenu(!showMenu)}> <Image src={`/assets/icon_${showMenu?"close":"menu"}.png`} fill={true} alt={'icon_menu'}></Image> </div>}
    </div>
  );
}
