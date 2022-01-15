import { Identity, SubspaceClient } from "@subspace/subspace";
import "bootstrap/dist/css/bootstrap.min.css";
import { Network, OpenSeaPort } from "opensea-js";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import "./App.css";
import Collection from "./components/collection";
import Home from "./components/home";
import Mint from "./components/mint";
import NavBarWrapper from "./components/navbar";
import CollectionService from "./services/collection.service";

import WalletConnectButton from "./components/walletconnect/ethereum";
import PolkadotConnectButton from "./components/walletconnect/polkadot";

function App() {
  const [subspaceClient, setSubspaceClient] = useState<
    SubspaceClient | undefined
  >(undefined);
  const [identity, setIdentity] = useState<Identity | undefined>(undefined);
  const [accountAddress, setSelectedAccountAddress] = useState<string>("");

  const [provider, setProvider] = useState<Web3 | undefined>(undefined);
  const [opensea, setOpensea] = useState<OpenSeaPort | undefined>(undefined);
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");

  const [collectionAddress, setCollectionAddress] = useState<string[]>([]);

  useEffect(() => {
    console.log("Collection", collectionAddress);
  }, [collectionAddress]);

  useEffect(() => {
    setCollectionAddress(
      CollectionService.getCollection(connectedAddress, chainId)
    );
  }, [chainId, connectedAddress]);

  useEffect(() => {
    if (provider) {
      const opensea = new OpenSeaPort(provider.currentProvider, {
        networkName: Network.Rinkeby,
      });
      setOpensea(opensea);
    }
  }, [provider]);

  const addCollectionAddress = (address: string, collectionName: string) => {
    CollectionService.addCollection(
      connectedAddress,
      chainId,
      address,
      collectionName
    );
    setCollectionAddress(
      CollectionService.getCollection(connectedAddress, chainId)
    );
  };

  return (
    <BrowserRouter>
      <div id="app">
        <NavBarWrapper
          address={connectedAddress}
          accountAddress={accountAddress}
        />
        <div className="d-flex justify-content-center">
          <WalletConnectButton
            setChainId={setChainId}
            setConnectedAddress={setConnectedAddress}
            setProvider={setProvider}
          ></WalletConnectButton>
          <PolkadotConnectButton
            setSelectedAccountAddress={setSelectedAccountAddress}
            setSubspaceClient={setSubspaceClient}
            setIdentity={setIdentity}
          ></PolkadotConnectButton>
        </div>

        <Switch>
          <Route path="/" exact={true}>
            {subspaceClient && (
              <Home opensea={opensea} connectedAddress={connectedAddress} />
            )}
          </Route>
          <Route path="/item" exact={true}>
            {subspaceClient && (
              <Mint
                subspaceClient={subspaceClient}
                collectionAddress={collectionAddress}
                provider={provider}
                connectedAddress={connectedAddress}
                opensea={opensea}
              />
            )}
          </Route>
          <Route path="/collection" exact={true}>
            {subspaceClient && (
              <Collection
                subspaceClient={subspaceClient}
                provider={provider}
                connectedAddress={connectedAddress}
                addCollectionAddress={addCollectionAddress}
              />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
