<template>
    <div class="flex justify-center items-center">
  
      <div class="flex justify-center items-center">
        <div
          class="flex flex-col gap-3 boxShadow w-[100%] sm:w-[35rem]"
          style="
            margin: 2rem 0;
            /* width: 35rem; */
            padding: 3rem 3rem;
            background: #f4f2f1;
            border-radius: 10px;
          "
        >
            <img src="https://xitcoin.org/wp-content/uploads/2025/01/baniere.png" alt="" srcset="">
          <h1 class="text-center mb-[1rem] text-xl text-[#53585E]"><strong>XTC Bridge</strong></h1>
    
          <div class="flex gap-3 justify-center items-end">
            <div class="sm:col-span-3" style="width: 100%">
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-[#37393B]"
                >From</label
              >
              <div class="">
                <input
                  v-model="fromAddress"
                  type="text"
                  autocomplete="given-name"
                  class="boxShadow block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                  placeholder="from address"
                />
              </div>
            </div>
    
            <div class="sm:col-span-3">
              <!-- <label for="country" class="block text-sm font-medium leading-6"
                >Network</label
              > -->
              <div class="mt-2 boxShadow">
                <USelectMenu v-model="fromNetwork" :options="chains"  size='md' variant="none">
                  <template #leading > 
    
                      <UIcon
                        v-if="fromNetwork.icon"
                        :name="fromNetwork.icon"
                        class="w-5 h-5"
                      />
                      <UAvatar
                        v-else-if="fromNetwork.avatar"
                        v-bind="fromNetwork.avatar"
                        size="2xs"
                      />
    
                  </template>
                </USelectMenu>
              </div>
            </div>
          </div>
          <div class="flex gap-3 justify-center items-end ">
            <div class="sm:col-span-3" style="width: 100%">
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-[#37393B]"
                >To</label
              >
              <div class="mt-2">
                <input
                  v-model="toAddress"
                  type="text"
                  class="boxShadow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                  placeholder="to address"
                />
              </div>
            </div>
    
            <div class="sm:col-span-3">
              <!-- <label for="country" class="block text-sm font-medium leading-6"
                >Network</label
              > -->
              <div class="mt-2 boxShadow">
                <USelectMenu v-model="toNetwork" :options="chains" size='md' variant="none">
                  <template #leading>
                    <UIcon
                      v-if="toNetwork.icon"
                      :name="toNetwork.icon"
                      class="w-5 h-5"
                    />
                    <UAvatar
                      v-else-if="toNetwork.avatar"
                      v-bind="toNetwork.avatar"
                      size="2xs"
                    />
                  </template>
                </USelectMenu>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="sm:col-span-3" style="width: 100%">
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-[#37393B]"
                >Amount</label
              >
              <div class="mt-2">
                <input
                  v-model="amountS"
                  type="text"
                  autocomplete="given-name"
                  class="boxShadow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                  placeholder="amount"
                />
              </div>
            </div>
          </div>
    
          <!-- <button @click="send" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button> -->
          <button
            @click="send"
            class="inline-flex text-[#f4f2f1] items-center justify-center w-[100%] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[#2A85F3] hover:bg-[#FB8D00]"
          >
            Send
          </button>
        </div>
        <UModal v-model="isOpen" prevent-close>
          <button
            type="button"
            class="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
              ></path>
            </svg>
            Please Wait Your Token is Being Transferred
          </button>
        </UModal>
    </div>
    </div>
  </template>
  
  <script setup>
  import switchNetwork from "../composables/switchNetwork";
  import Web3 from "web3";
  import web3Rpc from "../composables/web3";
  import {
    ethContract,
    inoContract,
    ethToken,
    cronosContract,
    ethBridgeAddress,
    inoaiBridgeAddress,
    inoaiBridgeABI,
    inoaierc20,
    etherc20
  } from "../constants/contract-addresses";
  import ethAbi from "../constants/eth-abi.json";
  import ethTokenAbi from "../constants/ethTokenAbi.json";
  
  import ethLogo from "../assets/logo/eth.png";
  import croLogo from "../assets/logo/cro.png";
  const toast = useToast();
 
  


  const chains = [
    {
      id: "eth",
      label: "ETH",
      target: "_blank",
      avatar: { src: ethLogo },
    },
    {
      id: "ino",
      label: "INO",
      target: "_blank",
      avatar: {
        src: "https://ipfs.io/ipfs/QmdiEBREiSP9TBHqxV8Ap3kehvBktBWFCpXs3mkC4e18zM",
      },
    },
    {
      id: "cronos",
      label: "CRO",
      target: "_blank",
      avatar: { src: croLogo },
    },
  ];
  
  const isOpen = ref(false);
  const fromNetwork = ref(chains[1]);
  const toNetwork = ref(chains[0]);
  const fromAddress = ref("");
  const toAddress = ref("");
  const privateKey =
    "bdc4176a460f14418c592b5c12cc2d5681912d6981ca9650cf244076402fe52c";
  const currentChainId = ref();
  const amountS = ref();
  const signer = "0xbDcA717A17B0D41283f2f4fE6b62431D4a19f152";
  
 
  
  const inoToEth = async () => {
    try {
      isOpen.value = true;
      const web3 = new Web3(window.ethereum);
      const web3Eth = new web3Rpc.web3EthRpc.eth.Contract(inoaiBridgeABI, ethBridgeAddress);
      const web3Ino = new web3.eth.Contract(inoaiBridgeABI, inoaiBridgeAddress);
      const senderAddress = fromAddress.value;
      const to = toAddress.value;
      const amount = amountS.value * 1e8;
      const transaction = await web3Ino.methods
        .lockTokens(amount,BigInt(11155111),to)
        .send({ from: senderAddress });
        
        const transactionHash = transaction.transactionHash
      console.log("burn transaction", transactionHash);


      const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice();
      const gasLimit = 300000;
      const unlockTransaction = web3Eth.methods.unlockTokens(to,amount,transactionHash).encodeABI();
      const transactionObject = {
        from: signer,
        to: ethBridgeAddress,
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        data: unlockTransaction,
      };

      // Sign the transaction
      const signedTransaction =
        await web3Rpc.web3EthRpc.eth.accounts.signTransaction(
          transactionObject,
          privateKey
        );
  
      // Send the signed transaction
      const receiptMint = await web3Rpc.web3EthRpc.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
      console.log("unlock transaction", receiptMint)
      // Transaction successful
    //   console.log("Transaction successful:", receiptMint);
      toast.add({
        title: "Successfully Transfered",
        description: `successful`,
        color: "green",
      });
      fromAddress.value = "";
      toAddress.value = "";
      amountS.value = "";
      isOpen.value = false;
    } catch (e) {
        console.log(e)
      toast.add({
        title: "Failed",
        description: `Transfered from failed from ${e}`,
        color: "red",
      });
      fromAddress.value = "";
      toAddress.value = "";
      amountS.value = "";
      isOpen.value = false;
    }
  };
  
 
  
  async function send() {
    if (fromNetwork.value.id == "eth" && toNetwork.value.id == "ino") {
      if (fromNetwork.value.id == "eth") {
        try {
          await switchNetwork("eth");
          ethToIno();
        } catch (e) {}
      }
    } else if (fromNetwork.value.id == "ino" && toNetwork.value.id == "eth") {
      if (fromNetwork.value.id == "ino") {
        try {
          await switchNetwork("ino");
          inoToEth();
        } catch (e) {
          console.log("error is ", e);
        }
      }
    } else if (fromNetwork.value.id == "ino" && toNetwork.value.id == "cronos") {
      if (fromNetwork.value.id == "ino") {
        try {
          await switchNetwork("ino");
          inoToCronos();
        } catch (e) {
          console.log("error");
          return;
        }
      }
    } else if (fromNetwork.value.id == "cronos" && toNetwork.value.id == "ino") {
      if (fromNetwork.value.id == "cronos") {
        try {
          await switchNetwork("cronos");
          cronosToIno();
        } catch (e) {
          console.log("error");
        }
      }
    } else {
      console.log("error");
    }
  }
  
 




  const cronosToPolygon = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Polygon = new web3Rpc.web3PolygonRpc.eth.Contract(xitBridgeAbi, polygonContract);
    const web3Cronos = new web3.eth.Contract(xitBridgeAbi, cronosContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e8;
    const feeInEther = web3.utils.toWei('0.01', 'ether');
    await approveTokens(amount,fromNetwork.value.id);
    const transaction = await web3Cronos.methods
      .lockTokens(amount,BigInt(338),BigInt(80002),to)
      .send({ from: senderAddress , value: feeInEther});
      
    const transactionHash = transaction.transactionHash
    console.log("burn transaction", transactionHash);
  
    const gasPrice = await web3Rpc.web3PolygonRpc.eth.getGasPrice();
      const gasLimit = 300000;
      const unlockTransaction =  web3Polygon.methods.unlockTokens(to,BigInt(80002),amount,transactionHash).encodeABI();
      const transactionObject = {
        from: signer,
        to: polygonContract,
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        data: unlockTransaction,
      };

      // Sign the transaction
      const signedTransaction =
        await web3Rpc.web3PolygonRpc.eth.accounts.signTransaction(
          transactionObject,
          privateKey
        );
  
      // Send the signed transaction
      const receiptMint = await web3Rpc.web3PolygonRpc.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
      console.log("unlock transaction", receiptMint)

    toast.add({
      title: "Successfully Transfered",
      description: `successful`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
      console.log(e)
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${e}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  }
};


// ino to polygon
const inoToCronos = async () =>{
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Polygon = new web3Rpc.web3PolygonRpc.eth.Contract(inoaiBridgeABI, polygonBridgeAddress);
    const web3Ino = new web3.eth.Contract(inoaiBridgeABI, inoaiBridgeAddress);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e8;
    const transaction = await web3Ino.methods
      .lockTokens(amount,BigInt(11155111),to)
      .send({ from: senderAddress });
      
      const transactionHash = transaction.transactionHash
    console.log("burn transaction", transactionHash);


    const gasPrice = await web3Rpc.web3PolygonRpc.eth.getGasPrice();
    const gasLimit = 300000;
    const unlockTransaction = web3Eth.methods.unlockTokens(to,amount,transactionHash).encodeABI();
    const transactionObject = {
      from: signer,
      to: ethBridgeAddress,
      // nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: unlockTransaction,
    };

    // Sign the transaction
    const signedTransaction =
      await web3Rpc.web3PolygonRpc.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );

    // Send the signed transaction
    const receiptMint = await web3Rpc.web3PolygonRpc.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("unlock transaction", receiptMint)
    // Transaction successful
  //   console.log("Transaction successful:", receiptMint);
    toast.add({
      title: "Successfully Transfered",
      description: `successful`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
      console.log(e)
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${e}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  }
}



// const inoToEth = async () => {
//   try {
//     isOpen.value = true;
//     const web3 = new Web3(window.ethereum);
//     const web3Eth = new web3Rpc.web3EthRpc.eth.Contract(inoaiBridgeABI, ethBridgeAddress);
//     const web3Ino = new web3.eth.Contract(inoaiBridgeABI, inoaiBridgeAddress);
//     const senderAddress = fromAddress.value;
//     const to = toAddress.value;
//     const amount = amountS.value * 1e8;
//     // await approveTokens(amount)
//     const transaction = await web3Ino.methods
//       .lockTokens(amount,BigInt(11155111),to)
//       .send({ from: senderAddress });
      
//       const transactionHash = transaction.transactionHash
//     console.log("burn transaction", transactionHash);


//     // const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice();
//     // const gasLimit = 300000;
//     // const unlockTransaction = web3Eth.methods.unlockTokens(to,amount,transactionHash).encodeABI();
//     // const transactionObject = {
//     //   from: signer,
//     //   to: ethBridgeAddress,
//     //   // nonce: web3.utils.toHex(nonce),
//     //   gasPrice: web3.utils.toHex(gasPrice),
//     //   gasLimit: web3.utils.toHex(gasLimit),
//     //   data: unlockTransaction,
//     // };

//     // // Sign the transaction
//     // const signedTransaction =
//     //   await web3Rpc.web3EthRpc.eth.accounts.signTransaction(
//     //     transactionObject,
//     //     privateKey
//     //   );

//     // // Send the signed transaction
//     // const receiptMint = await web3Rpc.web3EthRpc.eth.sendSignedTransaction(
//     //   signedTransaction.rawTransaction
//     // );
//     // console.log("unlock transaction", receiptMint)
//     // Transaction successful
//   //   console.log("Transaction successful:", receiptMint);
//     toast.add({
//       title: "Successfully Transfered",
//       description: `successful`,
//       color: "green",
//     });
//     fromAddress.value = "";
//     toAddress.value = "";
//     amountS.value = "";
//     isOpen.value = false;
//   } catch (e) {
//       console.log(e)
//     toast.add({
//       title: "Failed",
//       description: `Transfered from failed from ${e}`,
//       color: "red",
//     });
//     fromAddress.value = "";
//     toAddress.value = "";
//     amountS.value = "";
//     isOpen.value = false;
//   }
// };




// Connect to Ethereum Node (Replace with your provider)
// const web3 = new Web3('https://your-ethereum-node-url'); 

// // Contract Details
// const contractAddress = "0xYourContractAddress";
// const tokenAmount = web3.utils.toWei('10', 'ether'); // Example 10 tokens
// const destinationChainId = 2;  // Replace with the actual destination chain ID
// const destinationAddress = "0xReceiverAddressOnOtherChain";


// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(account);

// // Contract Instances
// const bridgeContract = inoaiBridgeAddress;
// const tokenContract = inoaierc20;


// // -----------------------------
// // 1. Approve Tokens for Locking
// // -----------------------------
// async function approveTokens(amount) {
//     try {
//         const tx = tokenContract.methods.approve(contractAddress, amount);
//         const gas = await tx.estimateGas({ from: account.address });
//         const gasPrice = await web3.eth.getGasPrice();

//         const txData = {
//             from: account.address,
//             to: "0xYourTokenAddress",
//             data: tx.encodeABI(),
//             gas,
//             gasPrice
//         };

//         const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log("✅ Token Approval Successful:", receipt.transactionHash);
//     } catch (error) {
//         console.error("❌ Token Approval Failed:", error);
//     }
// }

// // -----------------------------
// // 2. Lock Tokens
// // -----------------------------
// async function lockTokens(amount, destinationChainId, destinationAddress) {
//     try {
//         const tx = bridgeContract.methods.lockTokens(amount, destinationChainId, destinationAddress);
//         const gas = await tx.estimateGas({ from: account.address });
//         const gasPrice = await web3.eth.getGasPrice();

//         const txData = {
//             from: account.address,
//             to: contractAddress,
//             data: tx.encodeABI(),
//             gas,
//             gasPrice
//         };

//         const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log("✅ Tokens Locked! Transaction Hash:", receipt.transactionHash);
//     } catch (error) {
//         console.error("❌ Lock Tokens Failed:", error);
//     }
// }

// // -----------------------------
// // 3. Listen for TokensLocked Event
// // -----------------------------
// function listenForTokensLocked() {
//     bridgeContract.events.TokensLocked({
//         fromBlock: 'latest'
//     })
//     .on('data', (event) => {
//         console.log("📩 Tokens Locked Event Detected:", event.returnValues);
//     })
//     .on('error', console.error);
// }

// // -----------------------------
// // 4. Unlock Tokens (Admin Only)
// // -----------------------------
// async function unlockTokens(user, amount, txHash) {
//     try {
//         const tx = bridgeContract.methods.unlockTokens(user, amount, txHash);
//         const gas = await tx.estimateGas({ from: account.address });
//         const gasPrice = await web3.eth.getGasPrice();

//         const txData = {
//             from: account.address,
//             to: contractAddress,
//             data: tx.encodeABI(),
//             gas,
//             gasPrice
//         };

//         const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log("✅ Tokens Unlocked! Transaction Hash:", receipt.transactionHash);
//     } catch (error) {
//         console.error("❌ Unlock Tokens Failed:", error);
//     }
// }

// // -----------------------------
// // Call the Lock Tokens Flow
// // -----------------------------
// async function bridgeFlow() {
//     const amount = tokenAmount;
//     await approveTokens(amount);
//     await lockTokens(amount, destinationChainId, destinationAddress);
//     listenForTokensLocked();
// }

// // Execute the bridge flow
// bridgeFlow();





const ethToIno = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Eth = new web3Rpc.web3EthRpc.eth.Contract(inoaiBridgeABI, ethBridgeAddress);
    const web3Ino = new web3.eth.Contract(inoaiBridgeABI, inoaiBridgeAddress);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e8;
    const transaction = await web3Eth.methods
      .lockTokens(amount,BigInt(88559),to)
      .send({ from: senderAddress });
      
      const transactionHash = transaction.transactionHash
    console.log("burn transaction", transactionHash);

    toast.add({
      title: "Successfully Transfered",
      description: `successful`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
      console.log(e)
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${e}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  }
};




  </script>
  
  <style>
  .input-own {
    background: transparent;
    color: white !important;
    /* border: 1px solid #40a2d8; */
    padding-left: 0.5rem;
  }
  
  body {
    font-family: "DM Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
background: radial-gradient(at center, #FB8E00, #FFFFFF);
    color: #37393B;
    /* background-color: #101114 !important; */
  }
  
  .height-inp {
    height: 40px !important;
  }
  
  .boxShadow {
    box-shadow: -2px 0px 0px 0px rgba(135 ,142 ,153 ,0.75);
  -webkit-box-shadow: -2px 0px 0px 0px rgba(135, 142, 153 ,0.75);
  -moz-box-shadow: -2px 0px 0px 0px rgba(135 ,142 ,153 ,0.75); 
    box-shadow: 0px 0px 0px 0px rgba(135, 142, 153, 0.75);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(135, 142, 153, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(135, 142, 153, 0.75);
    border-radius: 6px;
  } 
  
  .boxShadow:hover {
    box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    -webkit-box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    -moz-box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    transition: box-shadow 0.3s ease-in-out;
    /* transition: box-shadow 0.3s ease-in-out; */
  }
  
  .boxShadow:focus-visible{
    box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    -webkit-box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    -moz-box-shadow: 0px 0px 7px 0px rgba(135, 142, 153, 0.75);
    transition: box-shadow 0.3s ease-in-out;
    outline: none !important;
  }
  
  
  .btnHover{
   box-shadow: none;
  }
  .btnHover:hover{
    box-shadow: 0px 1px 33px -13px rgba(226,61,247,1);
  -webkit-box-shadow: 0px 1px 33px -13px rgba(226,61,247,1);
  -moz-box-shadow: 0px 1px 33px -13px rgba(226,61,247,1);
  transition: box-shadow 0.2s ease-in-out;
  }
  
  
  </style>
  




