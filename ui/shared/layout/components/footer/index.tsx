import Image from 'next/image';
import React from 'react';

import { addNetwork } from '../../../../../common';
import { MEDIUM_LINK } from '../../../../../common/constant';
import useIsMobile from '../../../../../lib/hooks/useIsMobile';
import styles from './index.module.scss';

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <div className={ styles.container }>
      { isMobile && (
        <div className={ styles.logo }>
          <Image src="/assets/logo.png" fill={ true } alt="logo"></Image>
        </div>
      ) }
      <div className={ styles.top }>
        <div className={ styles.left }>
          <p>{ 'Powered by Match Chain\n' +
                        'MatchScan is a Block Explorer and Analytics Platform for Match Chain' }</p>
          <ul className={ styles.container_social }>
            <li>
              <a href={ MEDIUM_LINK.medium }></a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.discord }></a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.twitter }></a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.telegram }></a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.linktree }></a>
            </li>
            { /*<li>*/ }
            { /*    <a href={MEDIUM_LINK.reddit}></a>*/ }
            { /*</li>*/ }
            <li>
              <a href={ MEDIUM_LINK.mirror }></a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.github }></a>
            </li>
            { /*<li>*/ }
            { /*  <a href={MEDIUM_LINK.youtub}></a>*/ }
            { /*</li>*/ }
          </ul>
        </div>
        <div className={ styles.middle }>
          <p>Cpmpany</p>
          <ul>
            <li>Contact Us</li>
            <li>Learn Match</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className={ styles.right }>
          { !isMobile && (
            <div className={ styles.logo }>
              <Image src="/assets/logo.png" fill={ true } alt="logo"></Image>
            </div>
          ) }
          <div className={ styles.btn_add_chain } onClick={ addNetwork }>
            <div className={ styles.icon }>
              <Image src="/assets/icon_metamask.png" fill={ true } alt="logo"></Image>
            </div>
                        Add Match chain
          </div>
        </div>
      </div>
      <p className={ styles.copyright }>© 2022 Match Chain.</p>
    </div>
  );
}
