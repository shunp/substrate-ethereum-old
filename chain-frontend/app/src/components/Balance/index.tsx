import React from 'react'
import BN from 'bn.js'

interface IProps {
    type: 'ethereum' | 'substrate'
    address: string
}

export function Balance({ address, type }: IProps) {
    console.log(address, type)
    return (
        <>
            {<p>sssss</p>}
        </>
    )
}