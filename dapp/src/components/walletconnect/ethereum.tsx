import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Web3 from "web3";

export interface WalletConnectProps {
  setProvider: (provider: Web3) => void;
  setConnectedAddress: (address: string) => void;
  setChainId: (chainId: string) => void;
}

export interface ConnectInfo {
  chainId: string;
}

const WalletConnectButton: React.FC<WalletConnectProps> = ({
  setProvider,
  setConnectedAddress,
  setChainId,
}) => {
  const [disableConnectButton, setDisableConnectButton] =
    useState<boolean>(false);

  useEffect(() => {
    return () => {
      setDisableConnectButton(false);
    };
  }, []);

  const onConnectClick = async () => {
    const provider = await detectEthereumProvider();
    if (provider && window.ethereum) {
      await listenMetamask(window.ethereum as MetaMaskInpageProvider);
    } else {
      alert("Please install Metamask Extension");
    }
  };

  const listenMetamask = async (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("accountsChanged", (_accounts) => {
      window.location.reload();
    });

    ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    try {
      const accounts = await ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (accounts) {
        setConnectedAddress(accounts[0] || "");
      }
      if (ethereum.isConnected()) {
        let chainId = Number(ethereum.chainId || "");
        if (chainId !== 4) {
          //@ts-ignore
          if (!alert("Please switch to rinkeby")) {
            window.location.reload();
          }
        } else {
          setDisableConnectButton(true);
          setChainId(chainId.toString());
          //@ts-expect-error
          setProvider(new Web3(ethereum));
        }
      }
    } catch (error) {}
  };

  return !disableConnectButton ? (
    <Button
      className="mr-2"
      variant="primary"
      onClick={() => {
        onConnectClick();
      }}
      disabled={disableConnectButton}
    >
      Connect with Metamask
    </Button>
  ) : null;
};

export default WalletConnectButton;
