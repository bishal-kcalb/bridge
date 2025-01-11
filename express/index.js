import express from 'express'
import Web3 from 'web3'
const app = express()
const port = 3001
// const amountS = ref()
// const ethToIno = async () => {
//     try {

//       const web3 = new Web3(window.ethereum);
//       const web3Eth = new web3.eth.Contract(ethAbi, ethContract)
//       const web3Ino = new web3.eth.Contract(ethAbi, inoContract)
//       const senderAddress = fromAddress.value
//       const to = toAddress.value
//       const amount = amountS.value * 1e18;
//       // const amount = amountS.value
//       const transaction = await web3Eth.methods.burnTokens(amount).send({ from: senderAddress })
//       console.log("burn transaction", transaction)
  
    //   const nonce = await web3Rpc.web3InoRpc.eth.getTransactionCount(signer);
  
    //   // Build the transaction object
    //   const gasPrice = await web3Rpc.web3InoRpc.eth.getGasPrice();
    //   const gasLimit = 300000; // Adjust the gas limit as needed
    //   const data = web3Ino.methods.mintTokens(to, amount).encodeABI();
    //   const transactionObject = {
    //     from: signer,
    //     to: inoContract,
    //     nonce: web3.utils.toHex(nonce),
    //     gasPrice: web3.utils.toHex(gasPrice),
    //     gasLimit: web3.utils.toHex(gasLimit),
    //     data: data
    //   };
  
    //   // Sign the transaction
    //   const signedTransaction = await web3Rpc.web3InoRpc.eth.accounts.signTransaction(transactionObject, privateKey);
  
    //   // Send the signed transaction
    //   const receiptMint = await web3Rpc.web3InoRpc.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  
    //   // Transaction successful
    //   console.log('Transaction successful:', receiptMint);
  


  
  
  
//     }
//     catch (e) {

//     }
  
//   }
app.get('/', (req, res) => {
    const web3 = new Web3(window.ethereum);
    res.send(web3)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})