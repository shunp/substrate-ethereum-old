import React from 'react'
import BN from 'bn.js'
import { useSubscribable } from '../../util/hook'
import { useApi } from '../context'
import { LinearProgress } from '@material-ui/core'

interface IProps {
    type: 'ethereum' | 'substrate'
    address: string
}

export function Balance({ address, type }: IProps) {
    console.log(address, type)
    const api = useApi()
    const [balance, { error, loaded }] = useSubscribable(
        type === 'ethereum'
            ? () => api.getEthBalance$(address)
            : () => api.getSubstrateBalance$(address),
        [address],
        new BN(0)
    )
    return (
        <>
            {!loaded && !error && <LinearProgress/>}
            {loaded &&  `${balance}`}
        </>
    )
}