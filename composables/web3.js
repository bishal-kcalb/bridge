import Web3 from "web3";

const  web3EthRpc = new Web3("https://eth-sepolia.api.onfinality.io/public")
const web3InoRpc = new Web3("https://inoai-network.com")
const web3CronosRpc = new Web3("https://cronos-testnet.drpc.org")
const web3PolygonRpc = new Web3("https://rpc-amoy.polygon.technology")

export default {web3EthRpc,web3InoRpc,web3CronosRpc}

