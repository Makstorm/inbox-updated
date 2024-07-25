const HDWalletProvider = require('@truffle/hdwallet-provider');

const { Web3 } = require('web3');
require('dotenv').config()
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(process.env.TEST_METAMASK, "https://sepolia.infura.io/v3/b85b6e131c4b4641b5cca72196770c44")


const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(abi).deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] }).send({ gas: 1000000, from: accounts[0] })

    console.log(result)
    console.log('Contract deployed to', result.options.address)

    provider.engine.stop()
}

deploy()
