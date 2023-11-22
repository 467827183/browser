import axios from 'axios';
import { formatUnits } from 'viem';

import { ZERO_ADDRESS } from '../lib/consts';
import { SERVER_NEWS_API } from './constant';

export function formatBalance(s: string | number, decimals = 4): string {
  const init = 0;
  if (isNaN(Number(s))) {
    return floorFixed(init, decimals).toString();
  }
  return s ? floorFixed(s, decimals).toString() : floorFixed(init, decimals).toString();
}

export function floorFixed(s: string | number, decimals = 4) {
  s = Number(s);
  return Math.floor(s * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function bigNumberToBalance(str?: string | bigint, decimals = 18) {
  if (!str) {
    return 0;
  }
  return Number(formatUnits(BigInt(str), decimals));
}

export function formatAccount(account: string | undefined, decimals = 4) {
  if (!account) {
    return '';
  }
  if (account == ZERO_ADDRESS) {
    return '';
  }
  return account.slice(0, decimals) + '****' + account.slice(-decimals);
}

export async function addNetwork() {
  if (!window.ethereum) {
    return;
  }
  const id = 9001;
  const chainId = '0x' + id.toString(16);
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [ { chainId: chainId } ],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainId,
              chainName: 'Match',
              nativeCurrency: {
                name: 'MAT',
                symbol: 'MAT', // 2-6 characters long
                decimals: 18,
              },
              rpcUrls: [ 'https://rpc.matchscan.io/' ] /* ... */,
              blockExplorerUrls: [ 'https://lisbon.matchscan.io/' ],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}
export function axiosCustom({ api = SERVER_NEWS_API, cmd = '', headers = {}, params = {}, method = 'get', data = {}, successCode = 0 }): Promise<any> {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios({
        url: api + cmd,
        method: method,
        headers,
        params,
        data,
      });
      const resData = res.data;
      // console.log(resData,"==============",successCode,resData.code===successCode)
      if (resData.code === successCode) {
        resolve(resData.data);
      } else {
        console.log({
          cmd: api + cmd,
          method: method,
          data: resData,
        });
        // message.error(resData.msg)
        reject({
          cmd: api + cmd,
          method: method,
          msg: resData.msg,
        });
      }
    } catch (e) {
      console.log({
        cmd: api + cmd,
        method: method,
        data: e,
      });
      reject({
        cmd: api + cmd,
        method: method,
        msg: e,
      });
    }
  });
}
