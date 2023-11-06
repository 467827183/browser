import { formatUnits } from 'viem';
import { ZERO_ADDRESS } from '../lib/consts';

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
    const id = 9001
    const chainId='0x'+ id.toString(16)
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [ { chainId: chainId } ],
        });
    } catch (switchError:any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainId,
                            chainName: 'Match',
                            rpcUrls: [ 'https://rpc.matchscan.io/' ] /* ... */,
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
