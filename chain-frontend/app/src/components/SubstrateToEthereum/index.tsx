import React, {useState} from 'react'

import {Address} from '../Address'
import SendingForm from './SendingForm';

function SubstrateToEthereum() {
    const [selectedFromAddress, selectFromAddress] = useState<string | null>(null);
    console.log(selectedFromAddress)
    return (
        <>
            {selectedFromAddress && <Address type="substrate" address={selectedFromAddress} />}
            <SendingForm></SendingForm>
        </>
    )
}

export default SubstrateToEthereum