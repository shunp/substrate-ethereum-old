import * as React from 'react'
import { useApi } from '../context'
import { useSubscribable } from '../../util/hook'
import { Address } from '../Address'

function EthereumToSubstrate() {
    const api = useApi()
    const [account, { error: accountError }] = useSubscribable(() => api.getEthAccount$(), [])

    return (
        <>
            {account && <Address address={account} type="ethereum" />}
        </>
    )
}

export default EthereumToSubstrate