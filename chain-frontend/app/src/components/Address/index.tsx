import React from 'react'

import { Balance } from '../Balance'

interface IProps {
    type: 'ethereum' | 'substrate'
    address: string
    name?: string
}

export function Address({ address, type, name }: IProps) {
    return (
        <>
            <p>Balance: <Balance address={address} type={type} /></p>
        </>
    )
}