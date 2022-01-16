import { SubspaceClient } from "@subspace/subspace";
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
import { Card, Col, Container, Row } from "react-bootstrap";

function App() {
  const [subspaceClient, setSubspaceClient] = useState<
    SubspaceClient | undefined
  >(undefined);
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
          setSelectedAccountAddress={setSelectedAccountAddress}
          setSubspaceClient={setSubspaceClient}
          setChainId={setChainId}
          setConnectedAddress={setConnectedAddress}
          setProvider={setProvider}
        />
        {!subspaceClient && (
          <Container>
            <Row>
              <Col md="6">
                <Card>
                  <Card.Body>
                    <Card.Title>Ethereum Network - Metamask</Card.Title>
                    <Card.Text>
                      Please connect using Metamask Extension. This allows you
                      to connect to the Ethereum Network, create an NFT
                      Collections, Mint a new NFT, List you NFT on OpenSea, Show
                      you assets in this home page.
                    </Card.Text>
                    <Card.Link href="https://metamask.io/" target={"_blank"}>
                      Install Metamask
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="6">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Subspace Network - Polkadot.js Extension
                    </Card.Title>
                    <Card.Text>
                      Please connect using Polkadot.js Extension. This allows
                      you to connect to the Subspace Network to put and get
                      files for your NFT's and Collections metadata.
                    </Card.Text>
                    <Card.Link
                      href="https://polkadot.js.org/extension/"
                      target={"_blank"}
                    >
                      Install Polkadot.js Extension
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <hr className="mt-4 mb-4"></hr>
            <Row>
              <p>How this Works?</p>
              <p>
                This is a Demo dApp, it uses <b>Ethereum Rinkeby</b> network to
                <b> deploy </b> NFT Collections and Token contracts. The
                deployed contracts are <b>owned</b> by the connected account
                using metamask.
              </p>
              <p>
                At the same time, we connect to Subspace Network and use the
                Storage API to put and get NFT metadata files.
              </p>

              <p>Happy Path:</p>

              <span>
                <p>
                  - <b> Connect </b> to Ethereum Rinkeby using metamask (Need an
                  account with funds, https://faucet.rinkeby.io/)
                </p>
                <p>
                  - <b> Connect </b> to Subspace Network using Polkadot.js
                  Extension.
                </p>
                <p>
                  - Create a <b>new NFT Collection</b> and <b> deploy </b> the
                  contract to Ethereum.
                </p>
                <p>
                  - Create a <b>new NFT Item </b> using an existing Collection.
                </p>
                <ul>
                  <li> Store Attached File to Subspace Network.</li>
                  <li> Attach File (ObjectId) to the NFT Item.</li>
                  <li> Mint and approve the new NFT.</li>
                  <li> List the NFT in OpenSea.</li>
                  <li> Show your NFT's and Collections in the home page.</li>
                </ul>
              </span>
            </Row>
          </Container>
        )}
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
