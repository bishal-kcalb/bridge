const switchNetwork = async (networkName) => {
    if (window.ethereum) {
      try {
        const networkParams = getNetworkParams(networkName);
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkParams.chainId }],
        });
      } catch (error) {
        if (error.code === 4902) {
          // The network is not added to MetaMask, you can prompt the user to add it
          console.error('This network is not added to MetaMask');
        } else {
          console.error('Failed to switch network:', error);
        }
      }
    } else {
      alert('MetaMask is not installed');
    }
  };
  
  const getNetworkParams = (networkName) => {
    switch (networkName) {
      case 'cronos':
        return {
          // chainId: '0x152', // BSC Mainnet chainId
          chainId:'0x19',
          // chainName: 'Cronos Testnet',
          nativeCurrency: {
            // name: 'Test Cronos',
            symbol: 'CRO',
            decimals: 18,
          },
          rpcUrls: ['https://1rpc.io/cro'],
          blockExplorerUrls: ['https://cronoscan.com/'],
        };
      case 'ino':
        return {
          chainId: '0x159EF', // Ethereum Mainnet chainId
          chainName: 'Ino Network',
          nativeCurrency: {
            // name: 'Inoai',
            symbol: 'INO',
            decimals: 18,
          },
          rpcUrls: ['https://inoai-network.com'],
          blockExplorerUrls: ['https://inoai.live'],
        };
        case 'eth':
            return {
              chainId: '0x1', // Ethereum Mainnet chainId
              // chainName: 'Sepolia',
              nativeCurrency: {
                // name: 'sepoliaEth',
                symbol: 'Eth',
                decimals: 18,
              },
              rpcUrls: ['https://1rpc.io/eth'],
              blockExplorerUrls: ['https://etherscan.io'],
            };
            case 'polygon':
              return {
                chainId: '0x13882', // Polygon testnet chainId
                // chainName: 'Polygon',
                nativeCurrency: {
                  // name: 'sepoliaEth',
                  symbol: 'POL',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc-amoy.polygon.technology'],
                
              };
      default:
        throw new Error('Unsupported network');
    }
  };
  
  export default switchNetwork
  