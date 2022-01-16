# NFTHack-2022

Repo for Subspace Lab's Team for the Eth NFTHack 2022 Hackathon

# Pre requisites

- node.js: 16 +
- truffle: `npm i -g truffle`
- yarn: `npm i -g yarn`

This projects run on rinkeby testnet, you need an account with funds to deploy and use the dapp.

- `https://faucet.rinkeby.io/`

# .env

MNEMONIC, Account used to deploy and test the dapp.
RINKEBY_URL, URL for the wallet provider. (Infura, Alchemy, etc.)

```
MNEMONIC="flash flash flash flash ...."
RINKEBY_URL="https://eth-rinkeby.alchemyapi.io/v2/KEY"
```

# Run

After setting .env and pre requisites installed.
Go to the project root folder and install dependencies:

- `yarn install`.

Test NFT contracts compilation:

- `truffle compile`

Test NFT contracts deployment:

- `truffle migrate --network rinkeby`

Go to ./subspace folder and run to build the lib:

- `npm ci && npm run build`

Go back to the project root folder and run to start the DAPP.

- `yarn start`

This will launch an app on localhost:3000.

Remeber to use metamask connected to the `Rinkeby` test network.

# Folder structure

## ./contracts

NFT Contracts to be used in the DAPP.

## ./migrations

Truffle scripts to compile and deploy contracts.

## ./subspace

A copy of the Subspace.js library to get the latest Storage API development version. It includes all the Polkadot.js libraries necesaries to connect to the Subspace Network and make use of the Storage API.

## ./src - ./public

A react app using NFT compiled contracts, metamask extension, polkadot extension, opensea.js.

Note: if you made modifications to the Solidity Contracts code, you need to update ./src/contract/ERC721.ts. This file contains ABI and Bytecode to interact with it.
