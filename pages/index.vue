<template>
  <div class="flex justify-center items-center">

    <div class="flex justify-center items-center">
      <div
        class="flex flex-col gap-3 boxShadow w-[100%] sm:w-[35rem]"
        style="
          margin: 2rem 0;
          /* width: 35rem; */
          padding: 3rem 3rem;
          background: #1c1b20;
          border-radius: 10px;
        "
      >
        <h1 class="text-center mb-[1rem] text-xl text-bgfrom"><strong>Ino Bridge</strong></h1>
  
        <div class="flex gap-3 justify-center items-end">
          <div class="sm:col-span-3" style="width: 100%">
            <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-white"
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
              class="block text-sm font-medium leading-6 text-white"
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
              class="block text-sm font-medium leading-6 text-white"
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
          class="btnHover inline-flex text-[#c4cfde] items-center justify-center w-[100%] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-gradient-to-r from-bgfrom to-bgto"
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

const ethToIno = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Eth = new web3.eth.Contract(ethAbi, ethContract);
    const web3Ino = new web3.eth.Contract(ethAbi, inoContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e18;
    // const amount = amountS.value
    const transaction = await web3Eth.methods
      .burnTokens(amount)
      .send({ from: senderAddress });
    console.log("burn transaction", transaction);

    const nonce = await web3Rpc.web3InoRpc.eth.getTransactionCount(signer);

    // Build the transaction object
    const gasPrice = await web3Rpc.web3InoRpc.eth.getGasPrice();
    const gasLimit = 300000; // Adjust the gas limit as needed
    const data = web3Ino.methods.mintTokens(to, amount).encodeABI();
    const transactionObject = {
      from: signer,
      to: inoContract,
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: data,
    };

    // Sign the transaction
    const signedTransaction =
      await web3Rpc.web3InoRpc.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );

    // Send the signed transaction
    const receiptMint = await web3Rpc.web3InoRpc.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    // Transaction successful
    console.log("Transaction successful:", receiptMint);

    toast.add({
      title: "Successfully Transfered",
      description: `Transfered success from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
    isOpen.value = false;
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    console.log(e);
  }
};

const inoToEth = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Eth = new web3Rpc.web3EthRpc.eth.Contract(ethAbi, ethContract);
    const web3Ino = new web3.eth.Contract(ethAbi, inoContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e18;
    const transaction = await web3Ino.methods
      .burnTokens(amount)
      .send({ from: senderAddress });
    console.log("burn transaction", transaction);
    const nonce = await web3Rpc.web3EthRpc.eth.getTransactionCount(signer);

    // Build the transaction object
    const gasPrice = await web3Rpc.web3EthRpc.eth.getGasPrice();
    const gasLimit = 300000; // Adjust the gas limit as needed
    const data = web3Eth.methods.mintTokens(to, amount).encodeABI();
    const transactionObject = {
      from: signer,
      to: ethContract,
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: data,
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

    // Transaction successful
    console.log("Transaction successful:", receiptMint);
    toast.add({
      title: "Successfully Transfered",
      description: `Transfered success from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  }
};

const inoToCronos = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Cronos = new web3Rpc.web3CronosRpc.eth.Contract(
      ethAbi,
      ethContract
    );
    const web3Ino = new web3.eth.Contract(ethAbi, inoContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e18;
    const transaction = await web3Ino.methods
      .burnTokens(amount)
      .send({ from: senderAddress });
    console.log("burn transaction", transaction);

    const nonce = await web3Rpc.web3CronosRpc.eth.getTransactionCount(signer);

    // Build the transaction object
    const gasPrice = await web3Rpc.web3CronosRpc.eth.getGasPrice();
    const gasLimit = 300000; // Adjust the gas limit as needed
    const data = web3Cronos.methods.mintTokens(to, amount).encodeABI();
    const transactionObject = {
      from: signer,
      to: cronosContract,
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: data,
    };

    // Sign the transaction
    const signedTransaction =
      await web3Rpc.web3CronosRpc.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );

    // Send the signed transaction
    const receiptMint = await web3Rpc.web3CronosRpc.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    // Transaction successful
    console.log("Transaction successful:", receiptMint);
    toast.add({
      title: "Successfully Transfered",
      description: `Transfered success from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "green",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "red",
    });
    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
    console.log("error isOpen", e);
  }
};

const cronosToIno = async () => {
  try {
    isOpen.value = true;
    const web3 = new Web3(window.ethereum);
    const web3Cronos = new web3.eth.Contract(ethAbi, cronosContract);
    const web3Ino = new web3.eth.Contract(ethAbi, inoContract);
    const senderAddress = fromAddress.value;
    const to = toAddress.value;
    const amount = amountS.value * 1e18;
    const transaction = await web3Cronos.methods
      .burnTokens(amount)
      .send({ from: senderAddress });
    console.log("burn transaction", transaction);

    const nonce = await web3Rpc.web3InoRpc.eth.getTransactionCount(signer);

    // Build the transaction object
    const gasPrice = await web3Rpc.web3InoRpc.eth.getGasPrice();
    const gasLimit = 300000; // Adjust the gas limit as needed
    const data = web3Ino.methods.mintTokens(to, amount).encodeABI();
    const transactionObject = {
      from: signer,
      to: inoContract,
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: data,
    };

    // Sign the transaction
    const signedTransaction =
      await web3Rpc.web3InoRpc.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );

    // Send the signed transaction
    const receiptMint = await web3Rpc.web3InoRpc.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    // Transaction successful
    console.log("Transaction successful:", receiptMint);
    toast.add({
      title: "Successfully Transfered",
      description: `Transfered success from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
      color: "green",
    });

    fromAddress.value = "";
    toAddress.value = "";
    amountS.value = "";
    isOpen.value = false;
  } catch (e) {
    toast.add({
      title: "Failed",
      description: `Transfered from failed from ${fromNetwork.value.id} to ${toNetwork.value.id}`,
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

const approve = async () => {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(ethTokenAbi, ethToken);
  const senderAddress = "0xDfb2782396eBb81219e5171c2a43E903EFf7e16A";
  const amountToApprove = web3.utils.toWei("10000000", "ether");
  try {
    const tx = await tokenContract.methods
      .approve(senderAddress, amountToApprove)
      .send({ from: window.ethereum.selectedAddress });
    console.log("Transaction hash:", tx.transactionHash);
  } catch (error) {
    console.error("Error approving spending:", error);
  }
};

onMounted(async () => {
  //   const web3 = new Web3(window.ethereum)
  //   if (typeof (window.ethereum !== undefined)) {
  //     web3.eth.getChainId().then((chainId) => {
  //       console.log("connected chainId is ", chainId)
  //       currentChainId.value = chainId
  //     })
  //   }
  //   else {
  //     console.log('metamask not detected')
  //   }
  //   console.log(fromNetwork.value.id)
  // await console.log("netwrok is :",switchNetwork)
  // await switchNetwork('ino')s
});
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
  background: #101114;
  color: #ffffff;
  background-color: #101114 !important;
}

.height-inp {
  height: 40px !important;
}

.boxShadow {
  box-shadow: -2px 0px 9px 0px rgba(135 ,142 ,153 ,0.75);
-webkit-box-shadow: -2px 0px 9px 0px rgba(135, 142, 153 ,0.75);
-moz-box-shadow: -2px 0px 9px 0px rgba(135 ,142 ,153 ,0.75); 
  box-shadow: 0px 0px 3px 0px rgba(135, 142, 153, 0.75);
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
