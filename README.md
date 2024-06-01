# token-wizard
ETHPrague 2024

# install dependencies
```
yarn
yarn bootstrap
```
# run compile contracts
```
yarn contract:compile
```
# run local EVM node
```
yarn start:hardhat
```
# deploy contracts
```
// local EVM node
yarn contract:deploy:local

// sepolia testnet
yarn contract:deploy:sepolia
```
# run frontend
```
// run frontend
yarn start:front
```
# envs
contracts: `packages/contracts/.env`
front: `packages/front/.env.local`
# Contribution
Conventional commits: https://www.conventionalcommits.org/en/v1.0.0/
