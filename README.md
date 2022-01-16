# 💻 NFTHack-2022

Repo for Subspace Lab's Team for the Eth NFTHack 2022 Hackathon.

# 🔒 Meta Vault

Meta Vault is a decentralized storage vault to archive your most precious on-chain assets. This allows a user to connect their Metamask & Polkadot.js wallet to the dApp and it pulls your Assets from your wallet. It will then show them and provide an opportunity to archive them using the Subspace Network for cheap a cost effective archival solution.

# 🚧Demo

You can watch a brief description of what this project does and who it's for.

## Demo Video

TODO: Insert gif or link to demo

## Live Demo

[link](https://nfthack-2022.subspace.network/)

# 📚 Tech Stack

The tech stack and open-source code used for this project.

## Web 2

- [node.js]()
- [npm]()
- [yarn]()

## Web 3

- Ethereum providers.

  - [infura](https://infura.io/)
  - [alchemy](https://alchemy.com/)
  - [quicknode](https://quicknode.com/)

- Browser wallet extensions.

  - [metamask](https://metamask.ui/)
  - [polkadot.js extension](https://polkadot.js.org/extension/)

- Development Tools and Libs.

  - [subspace.js](https://www.github.com/subspace/subspace.js). Pre-built code from the [Subspace Labs](https://github.com/subspace) team that utilizes a novel _Proof-of-Archival-Storage(PoAS)_ decentralized & incentive compatible storage network.
  - [opensea-js](https://github.com/ProjectOpenSea/opensea-js).
  - [truffle](https://trufflesuite.com/).

# 📖 Documentation

To run this app you will need to have installed some minimal dependencies.

- node.js: `>= 16`
- truffle: `npm i -g truffle`
- yarn: `npm i -g yarn`

This projects run on `rinkeby testnet`, you need an `account with funds` to deploy contracts, create Collections and mint NFT's, and use the dApp.

- Get rinkeby Ether in the faucet. https://faucet.rinkeby.io/

## Folder structure

### subspace

Subspace.js library to connect and use the Storage API.

### truffle

Contains the solidity contracts to be used in the dApp.

- truffle .env

**MNEMONIC**, Account used to deploy and test the dApp.
**RINKEBY_URL**, URL for the wallet provider. (Infura, Alchemy, etc.)

```
MNEMONIC="flash ........... beef"
RINKEBY_URL="https://rinkeby.infura.io/v3/API_KEY"
```

### dApp

React dApp, uses metamask and polkadot extension to deploy and mint NFT's on Ethereum and also put and get metadata and files using the Subspace Network Storage.

- dApp .env

**REACT_APP_NODE_WS_PROVIDER**, Subspace Network node.
**REACT_APP_FARMER_WS_PROVIDER**, Subspace Network farmer.

```
REACT_APP_NODE_WS_PROVIDER=wss://aries-test-rpc-b.subspace.network
REACT_APP_FARMER_WS_PROVIDER=wss://aries-test-rpc-b.subspace.network/farmer
```

## Run

### Truffle

Go to truffle folder and run. (Need .env created with an account with funds and a provider endpoint)

- `npm ci && truffle compile`.

If you want to test and deploy contracts run:

- `truffle migrate --network rinkeby`.

### Subspace.js

Go to subspace folder, install dependencies and build the library.

- `npm ci && npm run build`.

### dApp

Go to dApp folder and run. (Need .env created with working endpoints)

- `yarn install`.
- `yarn start`.
