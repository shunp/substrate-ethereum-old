# [WIP] substrate-ethereum

This is a bridge example between Ethereum contract and Substrate chain.

```
substrate-ethereum
  |-- chain-bridge
  |   |-- src
  |   |   |-- main.rs (Bridge Logic between Ethereum and Origin Chain built by Substrate)
  |   |-- vendor
  |       |-- substrate-api-client (Substrate Client written in Rust)
  |-- chain-frontend
  |   |-- app/src
  |       |-- index.ts
  |-- ethereum-contract
  |   |-- contracts
  |       |-- NFT.sol (Based on ERC721.sol)
  |       |-- FT.sol (Based on ERC20.sol)
  |-- substrate-chain
  |   |-- runtime
  |   |   |-- src
  |   |       |-- lib.rs
  |   |       |-- nft.rs
  |   |       |-- ft.rs
  |   |-- src
  |       |-- main.rs (Chain Root)
  |-- substrate-monitoring
      |-- substrate-watcher
      |   |-- main.go 
      |-- go-substrate-rpc-client (Substrate Client written in Go)
      |-- docker-compose.yml
```

## Substrate Chain

How To Build a chain and Run it

```sh:
cd substrate-chain/substrate-nft
./scripts/init.sh
./scripts/build.sh
cargo build --release
./target/release/substrate-nft --dev
```

## Frontend

Before you loanch an app, you have to download a wallet attached to our web browser. (Chrome Recommended)
https://github.com/polkadot-js/extension

```
yarn
yarn start
```

## Monitoring Service

```
cd substrate-external
docker-compose up -d
```
