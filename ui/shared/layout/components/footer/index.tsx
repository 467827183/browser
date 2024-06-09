import Image from 'next/image';
import Link from 'next/link';
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
        <img className={ styles.logo } src="/assets/logo.png" alt="logo"></img>
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
            {/* <li>
              <a href={ MEDIUM_LINK.github }></a>
            </li> */}
            { /*<li>*/ }
            { /*  <a href={MEDIUM_LINK.youtub}></a>*/ }
            { /*</li>*/ }
          </ul>
        </div>
        <div className={ styles.middle }>
          <p>Company</p>
          <ul>
            <li>
              <a href={ 'mailto:' + MEDIUM_LINK.concat_us }>Contact Us</a>
            </li>
            <li>
              <a href={ MEDIUM_LINK.learn_about_match }>Learn About Match</a>
            </li>
            <li>
              <Link href="/terms_of_service">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className={ styles.right }>
          { !isMobile && (
            <img className={ styles.logo } src="/assets/logo.png" alt="logo"></img>
          ) }
          <div className={ styles.btn_add_chain } onClick={ addNetwork }>
            <img className={ styles.icon } src="/assets/icon_metamask.png" alt="logo"></img>
                        Add Match Chain
          </div>
        </div>
      </div>
      <p className={ styles.copyright }>© 2022 Match Chain.</p>
    </div>
  );
}
