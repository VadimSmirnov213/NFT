const { ethers } = require("ethers")
const data = require("./VKEvent.json")

async function deploy() {
    // ethers is available in the global scope
    // const [deployer] = await ethers.getSigners()
    // console.log(
    //     "Deploying the contracts with the account:",
    //     await deployer.getAddress()
    // )
    

    console.log("Account balance:", (await deployer.getBalance()).toString())

    const Token = await ethers.getContractFactory("Token")
    const token = await Token.deploy()
    await token.deployed()

    console.log("Token address:", token.address)
}

deploy()
    .then(() => process.exit(1))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
