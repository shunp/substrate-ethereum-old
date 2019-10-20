import Web3 from "web3"
import Contract from 'web3/eth/contract'
import { Observable, interval, from, fromEventPattern } from 'rxjs'
import { switchMap, skipWhile } from 'rxjs/operators'
import { ApiRx } from '@polkadot/api'
import { ETH_NETWORK_CONFIG, DEFAULT_DECIMALS } from "../env"
import { getContractData$ } from "~/util/getContractData$"
import dai from '../abi/Dai.json'
import BN from 'bn.js'
import { callPolkaApi } from './callPolkaApi'

export class Api {
    private _daiContract: Contract

    constructor(private _web3: Web3, private _substrateApi: Observable<ApiRx>) {
        this._daiContract = new this._web3.eth.Contract(
            dai.abi,
            ETH_NETWORK_CONFIG.contracts.dai
        )
    }

    public getEthAccount$(): Observable<string | null> {
        return from(getEthAccount(this._web3)).pipe(
            skipWhile(account => !account),
            switchMap(() => interval(1000).pipe(
                switchMap(() => getEthAccount(this._web3)),
            )),
        )
    }

    public getEthBalance$(_address: string): Observable<BN> {
        const address = _address.toLowerCase()
        return getContractData$<string, BN>(this._daiContract, "balanceOf", {
            args: [address],
            eventsForReload: [
                ["Transfer", { filter: { _from: address } }],
                ["Transfer", { filter: { _to: address } }]
            ],
            convert: value => new BN(value),
        })
    }

    public getSubstrateBalance$(_address: string): Observable<BN> {
        return callPolkaApi(this._substrateApi, 'query.token.balance', _address)
    }
}

async function getEthAccount(web3: Web3): Promise<string | null> {
    // Modern dapp browsers...
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.enable()
        } catch (error) {
            console.error('User denied account access')
            throw error
        }
    }
    const accounts = await web3.eth.getAccounts()
    return accounts[0] || null
}