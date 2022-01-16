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

After setting .env, install dependencies.

- `yarn install`.

Compile contracts:

- `truffle compile`

Test contracts deployment:

- `truffle migrate --network rinkeby`

Start DAPP.

- `yarn start`

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
