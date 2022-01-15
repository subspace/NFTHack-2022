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

# Folder structure

## Contracts

NFT Contracts to be used in the DAPP.

## Migrations

Truffle scripts to compile and deploy contracts.
