import React, {useState} from 'react'

import {Address} from '../Address'

function SubstrateToEthereum() {
    const [selectedFromAddress, selectFromAddress] = useState<string | null>(null);
    console.log(selectedFromAddress)
    return (
        <>
            {selectedFromAddress && <Address type="substrate" address={selectedFromAddress} />}
        </>
    )
}

export default SubstrateToEthereum