import Web3 from "web3"
import { Observable, interval, from, fromEventPattern } from 'rxjs'
import { switchMap, skipWhile } from 'rxjs/operators'
import { ApiRx } from '@polkadot/api'

export class Api {

    constructor(private _web3: Web3, private _substrateApi: Observable<ApiRx>) {
    }

    public getEthAccount$(): Observable<string | null> {
        return from(getEthAccount(this._web3)).pipe(
            skipWhile(account => !account),
            switchMap(() => interval(1000).pipe(
                switchMap(() => getEthAccount(this._web3)),
            )),
        )
    }

    public test() {
        console.log(this._web3)
        console.log(this._substrateApi)
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