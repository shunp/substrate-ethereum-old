import Web3 from "web3"
import { ApiRx, WsProvider } from '@polkadot/api'
import * as React from "react"
import { render } from "react-dom"

import App from './components/App'
import { ApiContext } from "./components/context";
import { Api } from "./api";
import { SUBSTRATE_NODE_URL, SUBSTRATE_NODE_CUSTOM_TYPES } from './env'

function Root() {
    if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider)
        const substrateApi = ApiRx.create({
            provider: new WsProvider(SUBSTRATE_NODE_URL),
            types: SUBSTRATE_NODE_CUSTOM_TYPES,
        })
        console.log('ok')
        const api = new Api(web3, substrateApi)
        return (
            <ApiContext.Provider value={api}>
                <App />
            </ApiContext.Provider>

        )
    } else {
        console.log('ng')
        return (
            <div>NG</div>
        )
    }
}

const rootElement = document.getElementById("root");
render(<Root />, rootElement);