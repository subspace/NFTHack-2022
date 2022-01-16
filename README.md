# 🔒Meta Vault

Meta Vault is a decentralized storage vault to archive your most precious on-chain assets. This allows a user to connect their Metamask & Polkadot.js wallet to the dApp and it pulls your Assets from your wallet. It will then show them and provide an opportunity to archive them using the Subspace Network for cheap a cost effective archival solution.

A brief description of what this project does and who it's for

# 💻NFTHack-2022

Repo for Subspace Lab's Team for the Eth NFTHack 2022 Hackathon.

## 🚧Demo

### Demo Video

Insert gif or link to demo

### Live Demo

[link](https://google.com)

## 📚Tech Stack

The tech stack and open-source code used for this project.

### Web 2

- [node.js & npm]()
- [yarn]()

### Web 3

- [subspace.js](https://www.github.com/subspace/subspace.js) - Pre-built code from the [Subspace Labs](https://github.com/subspace) team that utilizes a novel _Proof-of-Archival-Storage(PoAS)_ decentralized & incentive compatible storage network
- [truffle](https://trufflesuite.com/)
- [OpenSea SDK](https://github.com/ProjectOpenSea/opensea-js) - OpenSea SDK to mint NFT's.
- [OpenSea API](https://docs.opensea.io/reference/api-overview) - API to query NFT Data.

# 📖Documentation

## Pre requisites

- node.js: 16 +
- truffle: `npm i -g truffle`
- yarn: `npm i -g yarn`

This projects run on rinkeby testnet, you need an account with funds to deploy and use the dapp.

- `https://faucet.rinkeby.io/`

## Folder structure

### truffle

Contracts to be used in the DAPP.

#### truffle .env

MNEMONIC, Account used to deploy and test the dapp.
RINKEBY_URL, URL for the wallet provider. (Infura, Alchemy, etc.)

```
MNEMONIC="flash flash flash flash ...."
RINKEBY_URL="https://eth-rinkeby.alchemyapi.io/v2/KEY"
```

### subspace

Subspace.js.

### dapp

React Dapp, uses metamask and polkadot extension to Deploy and Mint NFT's on ethereum and Put and Get metadata files using the subspace network storage.

#### dapp .env

REACT_APP_NODE_WS_PROVIDER, subspace network node.
REACT_APP_FARMER_WS_PROVIDER, subspace network farmer.

```
REACT_APP_NODE_WS_PROVIDER=ws://localhost:9944
REACT_APP_FARMER_WS_PROVIDER=ws://localhost:9955
```

## Run

After setting .env, install dependencies.

- `yarn install`.

Compile contracts:

- `truffle compile`

Test contracts deployment:

- `truffle migrate --network rinkeby`
