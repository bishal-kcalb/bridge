<template>
  <div class="flex justify-center items-center">

    <div class="flex justify-center items-center">
      <div
        class="flex flex-col gap-3 boxShadowl w-[100%] sm:w-[35rem]"
        style="
          margin: 2rem 0;
          /* width: 35rem; */
          padding: 3rem 3rem;
          background: #E8E8ED;
          border-radius: 10px;
        "
      >
          <img src="https://xitcoin.org/wp-content/uploads/2025/01/baniere.png" alt="" srcset="">
        <h1 class="text-center mb-[1rem] text-xl text-[#53585E]"><strong>XTC Bridge</strong></h1>
  
        <div class="flex gap-3 justify-center items-end">
          <div class="sm:col-span-3" style="width: 100%">
            <!-- <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-[#37393B]"
              >From</label
            > -->
            <div class="">
              <input
                v-model="fromAddress"
                type="text"
                autocomplete="given-name"
                class="!text-[#37393B] boxShadow block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                placeholder="From address"
              />
            </div>
          </div>
  
          <div class="sm:col-span-3">
            <!-- <label for="country" class="block text-sm font-medium leading-6"
              >Network</label
            > -->
            <div class="mt-2 boxShadowl h-[3.5rem] flex justify-center items-center bg-white">
              <USelectMenu v-model="fromNetwork" :options="chains"  size='md' variant="none" @change="determineUnit()">
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
            <!-- <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-[#37393B]"
              >To</label
            > -->
            <div class="mt-2">
              <input
                v-model="toAddress"
                type="text"
                class="text-[#37393B] boxShadow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                placeholder="To address"
              />
            </div>
          </div>
  
          <div class="sm:col-span-3">
            <!-- <label for="country" class="block text-sm font-medium leading-6"
              >Network</label
            > -->
            <div class="mt-2 boxShadowl h-[3.5rem] flex justify-center items-center bg-white">
              <USelectMenu v-model="toNetwork" :options="chains" size='md' variant="none" @change="determineUnit()">
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
            <!-- <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-[#37393B]"
              >Amount</label
            > -->
            <div class="mt-2">
              <input
                v-model="amountS"
                type="text"
                autocomplete="given-name"
                class="text-[#37393B] boxShadow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 input-own"
                placeholder="Amount"
                @input="calculateFee();"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between text-sm text-[#a3a2a2] mt-[15px]">
          <span>Service Fee ≈ {{ serviceFee }}</span>
          <span>Destination Fee ≈ {{ destinationFee }}</span>
        </div>
        <!-- <button @click="send" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button> -->
        <button
          @click="()=>{openConfirmModel=true}"
          class="btnShadow mt-[1.5rem] h-[3.5rem] inline-flex text-[#f4f2f1] items-center justify-center w-[100%] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[#FB8D00] hover:bg-[#2A85F3]"
        >
          Send
        </button>
        <!-- <button @click = "send" class="button2"> Send</button> -->
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
      <UModal v-model="openConfirmModel" :ui="{background:'bg-white dark:bg-white'}">
      <div class="p-4">
        <div class="flex flex-col gap-5 text-center p-5">

          <span class="text-2xl text-[#37393B]">Do You Confirm?</span>
          <span class="text-md text-[#a3a2a2]">You Will Pay Below Fee</span>
          <div class="flex justify-between">
            <span class="text-sm">Service Fee ≈ {{ serviceFee }} {{ unit }}</span>
            <span class="text-sm">Destination Fee ≈ {{ destinationFee }} {{ destinationUnit }}</span>
          </div>
          <button
            @click="send"
            class="btnShadow mt-[1.5rem] h-[3.5rem] inline-flex text-[#f4f2f1] items-center justify-center w-[100%] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[#FB8D00] hover:bg-[#2A85F3]"
          >
            Confirm
          </button>
        </div>
      </div>
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
  polygonBridgeAddress,
  cronosBridgeAddress,
  erc20ABI,
  cronosErc20,
  inoaierc20,
  etherc20,
  polygonErc20,
  xitBridgeAbi,
  polygonContract
} from "../constants/contract-addresses";
import ethAbi from "../constants/eth-abi.json";
import ethTokenAbi from "../constants/ethTokenAbi.json";

import ethLogo from "../assets/logo/eth.png";
import croLogo from "../assets/logo/cro.png";
import polLogo from "../assets/logo/polLogo.webp"
import { parse } from "vue/compiler-sfc";
const toast = useToast();




const chains = [
  {
    id: "eth",
    label: "ETH",
    target: "_blank",
    avatar: { src: ethLogo },
  },

  {
    id: "cronos",
    label: "CRO",
    target: "_blank",
    avatar: { src: croLogo },
  },
{
  id:"polygon",
  label:"POL",
  target:'_blank',
  avatar:{src:polLogo}
}
];

const unit = ref('')
const destinationUnit=ref('')
const openConfirmModel = ref(false)
const destinationFee = ref(0)
const serviceFee = ref(0)
const isOpen = ref(false);
const fromNetwork = ref(chains[1]);
const toNetwork = ref(chains[0]);
const fromAddress = ref("");
const toAddress = ref("");
const privateKey =
  "921ca760798c9db1936cf016e1ecf2e2fb0926a7efe32f1100ed430ca500a791";
const currentChainId = ref();
const amountS = ref();
const signer = "0x379f5f6E1A298f3536D1a485DcEBDFf17ab7D2E7";



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

// const cronosToETH = async () => {
//   try {
//     isOpen.value = true;
//     const web3 = new Web3(window.ethereum);
//     const web3Eth = new web3Rpc.web3EthRpc.eth.Contract(inoaiBridgeABI, ethBridgeAddress);
//     const web3Cronos = new web3.eth.Contract(inoaiBridgeABI, cronosBridgeAddress);
//     const senderAddress = fromAddress.value;
//     const to = toAddress.value;
//     const amount = amountS.value * 1e8;
//     await approveTokens(amount,fromNetwork.value.id);
//     const transaction = await web3Cronos.methods
//       .lockTokens(amount,BigInt(11155111),to)
//       .send({ from: senderAddress });
      
//     const transactionHash = transaction.transactionHash
//     console.log("burn transaction", transaction);
  
//     const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice();
//       const gasLimit = 300000;
//       const unlockTransaction = web3Eth.methods.unlockTokens(to,amount,transactionHash).encodeABI();
//       const transactionObject = {
//         from: signer,
//         to: ethBridgeAddress,
//         // nonce: web3.utils.toHex(nonce),
//         gasPrice: web3.utils.toHex(gasPrice),
//         gasLimit: web3.utils.toHex(gasLimit),
//         data: unlockTransaction,
//       };

//       // Sign the transaction
//       const signedTransaction =
//         await web3Rpc.web3EthRpc.eth.accounts.signTransaction(
//           transactionObject,
//           privateKey
//         );
  
//       // Send the signed transaction
//       const receiptMint = await web3Rpc.web3EthRpc.eth.sendSignedTransaction(
//         signedTransaction.rawTransaction
//       );
//       console.log("unlock transaction", receiptMint)

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




const cronosToETH = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3ETH = new web3Rpc.web3EthRpc.eth.Contract(xitBridgeAbi, ethContract);
    const web3Cronos = new web3.eth.Contract(xitBridgeAbi, cronosContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e8;
    const feeInEther = web3.utils.toWei('0.001', 'ether');
    await approveTokens(amount,fromNetwork.value.id);
    const transaction = await web3Cronos.methods
      .lockTokens(amount,BigInt(338),BigInt(80002),to)
      .send({ from: senderAddress , value: feeInEther});
      
    const transactionHash = transaction.transactionHash
    console.log("burn transaction", transactionHash);
  
    const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice();
      const gasLimit = 300000;
      const unlockTransaction =  web3ETH.methods.unlockTokens(to,BigInt(80002),amount,transactionHash).encodeABI();
      const transactionObject = {
        from: signer,
        to: ethContract,
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

async function determineUnit(){
  if(fromNetwork.value.id == 'cronos'){
    unit.value = 'CRO'
  }
  else if(fromNetwork.value.id == 'polygon'){
    unit.value = 'POL'
  }

  else if(fromNetwork.value.id == 'eth'){
    unit.value == 'ETH'
  }
  if(toNetwork.value.id == 'cronos'){
    destinationUnit.value = 'CRO'
  }
  else if(toNetwork.value.id == 'polygon'){
    destinationUnit.value = 'POL'
  }

  else if(toNetwork.value.id == 'eth'){
    destinationUnit.value == 'ETH'
  }

}


async function send() {
  console.log('To address is ', toNetwork.value.id)
  console.log('from address is ', fromNetwork.value.id)
  if (fromNetwork.value.id == "eth" && toNetwork.value.id == "ino") {
    if (fromNetwork.value.id == "eth") {
      try {
        // await switchNetwork("eth");
        // ethToIno();
        polygonToEth()
      } catch (e) {
        console.log(e)
      }
    }
  } else if (fromNetwork.value.id == "ino" && toNetwork.value.id == "eth") {
    if (fromNetwork.value.id == "ino") {
      try {
        // await switchNetwork("ino");
        inoToEth();
      } catch (e) {
        console.log("error is ", e);
      }
    }
  } else if (fromNetwork.value.id == "ino" && toNetwork.value.id == "cronos") {
    if (fromNetwork.value.id == "ino") {
      try {
        // await switchNetwork("ino");
        inoToCronos();
      } catch (e) {
        console.log("error");
        return;
      }
    }
  } else if (fromNetwork.value.id == "cronos" && toNetwork.value.id == "ino") {
    if (fromNetwork.value.id == "cronos") {
      try {
        // await switchNetwork("cronos");
        cronosToIno();
      } catch (e) {
        console.log("error");
      }
    }
  }
    else if(fromNetwork.value.id == "cronos" && toNetwork.value.id == "eth"){
      if(fromNetwork.value.id == 'cronos'){
        try{
          await switchNetwork('eth');
          await sendNativeToken()
          await switchNetwork('cronos')
          await cronosToETH();
        }
        catch(e){
          console.log(e);
        }
      }
    }

    else if(fromNetwork.value.id == 'cronos' && toNetwork.value.id == 'polygon'){
      if(fromNetwork.value.id == 'cronos'){
       await switchNetwork('polygon')
       await sendNativeToken()
       await switchNetwork('cronos')
        await cronosToPolygon();
      }
    }


  else {
    console.log("error");
  }
}

async function calculateGasfee(){
  const web3 = new Web3(window.ethereum);

// Request account access
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
const senderAddress = accounts[0];
 const amount = amountS.value * 1e8;
  const web3ETH = new web3Rpc.web3EthRpc.eth.Contract(xitBridgeAbi, polygonContract);
  const web3Cronos = new web3Rpc.web3CronosRpc.eth.Contract(xitBridgeAbi,cronosContract);
  const txHash = web3.utils.keccak256("xitcoin-transactionhash-transaction");
  if(toNetwork.value.id == 'eth'){

    const estimatedGasFee = await web3ETH.methods.unlockTokens(toAddress.value, BigInt(80002), amount, txHash).estimateGas({from:senderAddress});
    const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice()
    const totalgasPrice = BigInt(estimatedGasFee) * BigInt(gasPrice)
    // console.log('Gas price is ', web3.utils.fromWei(totalgasPrice,'ether'))
    destinationFee.value =  totalgasPrice
  }



}

async function calculateServiceFee() {
  const tax = (0.001/100)* amountS.value
  serviceFee.value = parseFloat(tax).toFixed(6)
  // serviceFee = web3.utils.toWei(tax,'ether')
}

const calculateFee = async()=>{
  calculateGasfee();
  calculateServiceFee();
}

async function sendNativeToken() {
    try {
      // Request account access
      const web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const senderAddress = accounts[0]; 

      // Transaction details
      const recipientAddress = toAddress.value; 
      const amount = web3.utils.fromWei(destinationFee.value,'ether')
      const tx = {
        from: senderAddress,
        to: '0x64635ebde65fE0B8d8266610b0Bd01Bd5b33bc59',
        value:parseInt(web3.utils.toWei(amount,"ether")).toString(16),
      };
      console.log('Transaction parameters:', tx);
      // Send transaction and wait for confirmation
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      console.log('Transaction sent! Tx Hash:', txHash);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  }


// 1. Approve Tokens for Locking
// -----------------------------
async function approveTokens(amount,network) {
    try {
        // Request user account through MetaMask
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(erc20ABI,cronosErc20)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        const tx = ref()
        if(network == 'cronos'){
           tx.value = tokenContract.methods.approve(cronosContract, amount);
        }
        else if (network == 'eth'){
          tx.value = tokenContract.methods.approve(ethBridgeAddress, amount);
        }
        else{
          tx.value = tokenContract.methods.approve(polygonBridgeAddress, amount);
        }

        const gas = await tx.value.estimateGas({ from: userAddress });
        const gasPrice = await web3.eth.getGasPrice();

        // Send the transaction through MetaMask (or another injected wallet)
        const receipt = await tx.value.send({
            from: userAddress,
            gas,
            gasPrice
        });

        console.log("Token Approval Successful:", receipt.transactionHash);
    } catch (error) {
        console.error("Token Approval Failed:", error);
    }
}





</script>

<style>
.input-own {
  background: transparent;
  color: #37393B !important;
  /* border: 1px solid #40a2d8; */
  padding-left: 0.5rem;
  height: 3.5rem;
  padding-left: 1.5rem;
  cursor: pointer;

}

body {
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
background-image: url('../assets/logo/dune-top-xitcoin.png');
  color: #37393B;
  /* background-color: #101114 !important; */
}

.height-inp {
  height: 40px !important;
}

.boxShadow {
  box-shadow:inset 6px 6px 12px #c5c5c5,inset -6px -6px 12px #ffffff;
  border-radius: 6px;
} 

.boxShadowl {
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
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

.btnShadow{
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  border-radius: 6px;
}


/* From Uiverse.io by shah1345 */ 
.button2 {
  margin-top: 2rem;
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #FB8D00;
  padding: 0.7em 1.7em;
  cursor: pointer;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  box-shadow:inset 6px 6px 12px #c5c5c5,inset -6px -6px 12px #ffffff;
}

.button2:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.button2:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #FB8D00;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:hover {
  color: #ffffff;
  border: 1px solid #FB8D00;
}

.button2:hover:before {
  top: -35%;
  background-color: #FB8D00;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button2:hover:after {
  top: -45%;
  background-color: #FB8D00;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}


</style>





contract-addresses{0x66a6e6f592e51096a617e9cd510f54139ed631d1}