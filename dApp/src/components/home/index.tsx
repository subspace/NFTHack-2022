import { OpenSeaPort } from "opensea-js";
import { Asset, OpenSeaAsset } from "opensea-js/lib/types";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Table } from "react-bootstrap";

export interface HomeProps {
  opensea: OpenSeaPort | undefined;
  connectedAddress: string;
}

export interface IAssetCollection {
  [key: string]: OpenSeaAsset[];
}

export interface IOpenSeaAsset extends Asset {}

const Home: React.FC<HomeProps> = ({ opensea, connectedAddress }) => {
  useEffect(() => {
    refreshAsset();
  }, [opensea, connectedAddress]);

  const [assetCollection, setAssetCollection] = useState<IAssetCollection>({});

  const refreshAsset = async () => {
    if (opensea && connectedAddress) {
      let { assets } = await opensea.api.getAssets({
        owner: connectedAddress,
      });
      let assetCollection: IAssetCollection = {};
      for (const asset of assets) {
        let key = asset.assetContract.address + "_" + asset.collection.name;
        if (!(key in assetCollection)) {
          assetCollection[key] = [];
        }
        assetCollection[key].push(asset);
      }
      setAssetCollection(assetCollection);
      console.log(assetCollection);
    }
  };

  const onRefreshClick = async () => {
    await refreshAsset();
  };

  const collectionRendering = () => {
    let assetCollectionEntries = Object.entries(assetCollection);
    if (assetCollectionEntries.length > 0) {
      return assetCollectionEntries.map(([key, value], i) => {
        return (
          <div key={i}>
            <hr></hr>
            <h5>Collection {key.split("_").pop()}</h5>
            <Container>
              {value.map((e, i) => {
                return (
                  <Card style={{ maxWidth: "300px" }} key={i}>
                    <Card.Img
                      variant="top"
                      src={e.imageUrl}
                      style={{ maxWidth: "100%" }}
                    />
                    <Card.Body>
                      <Card.Title>Name: {e.name}</Card.Title>
                      <Card.Text>Description: {e.description}</Card.Text>
                      <Card.Link
                        href={`https://testnets.opensea.io/assets/${e.assetContract.address}/${e.tokenId}`}
                      >
                        Opensea
                      </Card.Link>
                    </Card.Body>
                  </Card>
                );
              })}
            </Container>
          </div>
        );
      });
    } else {
      return (
        <div className="d-flex justify-content-center p-7">
          <span>
            Nothing to show, no Collections or NFT's found. Did you connect with
            Metamask?
          </span>
        </div>
      );
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-start">
        <Button
          className="button-sm"
          variant="success"
          onClick={onRefreshClick}
        >
          Refresh Collections
        </Button>
      </div>
      {collectionRendering()}
    </Container>
  );
};

export default Home;
