import Web3 from "web3"
import { Observable } from 'rxjs'
import { ApiRx } from '@polkadot/api'

export class Api {

    constructor(private _web3: Web3, private _substrateApi: Observable<ApiRx>) {
    }

    public test() {
        console.log(this._web3)
        console.log(this._substrateApi)
    }
}