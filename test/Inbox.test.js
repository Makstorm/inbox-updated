const assert = require('assert')
const ganache = require('ganache');
const { describe, it, beforeEach } = require('mocha');
const { Web3 } = require('web3');
const { abi, evm } = require('../compile')


// updated ganache and web3 imports added for convenience

// contract test code will go here

const web3 = new Web3(ganache.provider())

let accounts
let inbox;
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [INITIAL_STRING]
        })
        .send({ from: accounts[0], gas: '1000000' })


})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()

        assert.equal(message, INITIAL_STRING)
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({
            from: accounts[0]
        })

        const message = await inbox.methods.message().call()
        assert.equal(message, 'bye')
    })
})

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// describe('Car', () => {

//     let car;

//     beforeEach(() => {
//         car = new Car();
//     })


//     it('park', () => {
//         assert.equal(car.park(), 'stopped')
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// })
