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
    alert("Refresh complete");
  };

  const collectionRendering = () => {
    let assetCollectionEntries = Object.entries(assetCollection);
    if (assetCollectionEntries.length > 0) {
      return assetCollectionEntries.map(([key, value], i) => {
        return (
          <div key={i}>
            <h5>Collection {key.split("_").pop()}</h5>
            <Container>
              {value.map((e, i) => {
                return (
                  <Col md="6">
                    <Card style={{ minWidth: "300px" }} key={i}>
                      <Card.Img variant="top" src={e.imageUrl} />
                      <Card.Body>
                        <Card.Title>Name: {e.name}</Card.Title>
                        <Card.Text>Description: {e.description}</Card.Text>
                        <Table>
                          <thead>
                            <tr>
                              <th>Property</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {e.traits.map((t: any, i) => {
                              return (
                                <tr key={i}>
                                  <td>{t["trait_type"]}</td>
                                  <td>{t["value"]}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <Card.Link
                          href={`https://testnets.opensea.io/assets/${e.assetContract.address}/${e.tokenId}`}
                        >
                          Opensea
                        </Card.Link>
                        <Card.Link
                          href={`https://rinkeby.rarible.com/token/${e.assetContract.address}:${e.tokenId}?tab=details`}
                        >
                          Rarible
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Container>
          </div>
        );
      });
    } else {
      return (
        <div className="d-flex justify-content-center">
          <span>Nothing to show</span>
        </div>
      );
    }
  };

  return (
    <Container>
      <div className="d-flex">
        <h3 className="m-1">My Vault Collections</h3>
        <Button variant="success" onClick={onRefreshClick}>
          Refresh
        </Button>
      </div>
      {collectionRendering()}
    </Container>
  );
};

export default Home;
