import React from 'react'
import EthereumToSubstrate from '../EthereumToSubstrate'
import SubstrateToEthereum from '../SubstrateToEthereum'

function App() {
  console.log(React)
  return (
    <>
      <p>Ethereum To Substrate</p>
      <EthereumToSubstrate/>
      <p>Substrate To Ethereum</p>
      <SubstrateToEthereum/>
    </>
  )
}

export default App