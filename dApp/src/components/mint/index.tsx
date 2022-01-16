import { SubspaceClient } from "@subspace/subspace";
import { OpenSeaPort } from "opensea-js";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Table,
} from "react-bootstrap";
import Web3 from "web3";
import { TransactionReceipt } from "web3-core";
import ERC721 from "../../contract/ERC721";
import { ipfs } from "../../services/ipfs.service";

export interface MintProps {
  subspaceClient: SubspaceClient;
  collectionAddress: string[];
  provider: Web3 | undefined;
  connectedAddress: string;
  opensea: OpenSeaPort | undefined;
}

export interface IAttribute {
  trait_type: string;
  value: string;
}

const Mint: React.FC<MintProps> = ({
  subspaceClient,
  collectionAddress,
  provider,
  connectedAddress,
  opensea,
}) => {
  const [selectedContract, setSelectedContract] =
    useState<string>("Select contract");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [externalLink, setExternalLink] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [newAttribute, setNewAttribute] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  useEffect(() => {
    console.log("Attributes", attributes);
  }, [attributes]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length) {
      setFile(e.target.files[0]);
    }
  };

  const onNewAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttribute(e.target.value);
  };

  const onNewAttributeValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAttributeValue(e.target.value);
  };

  const onAddAttributeClick = () => {
    if (newAttribute && newAttributeValue) {
      setAttributes([
        ...attributes,
        {
          trait_type: newAttribute,
          value: newAttributeValue,
        },
      ]);
      setNewAttribute("");
      setNewAttributeValue("");
    }
  };
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onExternalLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExternalLink(e.target.value);
  };

  const onContractSelect = (
    eventKey: string | null,
    e: React.SyntheticEvent<unknown>
  ) => {
    setSelectedContract(eventKey || "");
  };

  const onCreateClick = async () => {
    if (!selectedContract) {
      alert("Please select collection (contract)");
      return;
    }
    if (!name || !description || !externalLink || !file) {
      alert("Please fill in all fields");
      return;
    }
    if (Number.isNaN(Number(price))) {
      alert("Invalid price");
      return;
    }
    if (provider) {
      let fileHash: string = "";
      let objectId: string = "";
      if (file) {
        setProgress("Uploading file to IPFS");
        console.log("Uploading file");
        fileHash = await ipfs.add(file).then((r) => r.cid.toString());
        console.log("File hash", fileHash);
        setProgress("File successfully uploaded to IPFS");

        setProgress("Backup file to subspace");
        console.log("Backup file to subspace");
        const objectData = new Uint8Array(await file.arrayBuffer());
        objectId = await subspaceClient.putObject(objectData);
        console.log("File objectId", objectId);
        setProgress("File successfully backup to subspace");
      }
      const uriData = JSON.stringify({
        name,
        description,
        image: `ipfs://${fileHash}`,
        external_url: externalLink,
        attributes,
      });
      setProgress("Uploading token URI to IPFS");
      console.log("Uploading token URI");
      const tokenUriHash = await ipfs
        .add(uriData)
        .then((r) => r.cid.toString());
      console.log("TokenURI hash", tokenUriHash);
      setProgress("Token URI successfully uploaded to IPFS");

      setProgress("Backup token URI to subspace");
      console.log("Backup token URI to subspace");
      const tokenUriData = new TextEncoder().encode(uriData);
      const tokenUriObjectId = await subspaceClient.putObject(tokenUriData);
      console.log("tokenUriObjectId", tokenUriObjectId);
      setProgress("Token URI successfully backup to Subspace");

      const [address] = selectedContract.split("_");
      //@ts-ignore
      const contract = new provider.eth.Contract(ERC721.abi, address);
      setProgress("Minting NFT");
      contract.methods
        .mint(connectedAddress, tokenUriHash)
        .send({
          from: connectedAddress,
        })
        .on("receipt", (receipt: TransactionReceipt) => {
          if (receipt) {
            alert("Mint success");
            //@ts-ignore
            let tokenId = receipt.events["Transfer"].returnValues["tokenId"];
            console.log("TokenId", tokenId);
            setProgress("Delaying 30 seconds");
            setTimeout(() => {
              if (opensea) {
                setProgress("Placing sell order at open sea");
                opensea
                  .createSellOrder({
                    accountAddress: connectedAddress,
                    asset: {
                      tokenId,
                      tokenAddress: address,
                    },
                    startAmount: Number(price),
                    endAmount: Number(price),
                  })
                  .then((result) => {
                    alert("Successfully listed");
                    setProgress("");
                    console.log("Listing", result);
                  })
                  .catch((error) => {
                    setProgress(error.message);
                  });
              }
            }, 30000);
          }
        })
        .catch((error: any) => {
          setProgress(error.message);
        });
    }
  };

  return (
    <Container>
      <h3>Create Item</h3>
      <span className="small">{progress}</span>
      <DropdownButton
        title={selectedContract}
        id="dropdown-menu-align-right"
        onSelect={onContractSelect}
      >
        {collectionAddress.map((e) => {
          const [address, collectionName] = e.split("_");
          return (
            <Dropdown.Item eventKey={e} key={address}>
              {collectionName}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item name"
          onChange={onNameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item description"
          onChange={onDescriptionChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload item file"
          onChange={onFileChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>External Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item external link"
          onChange={onExternalLinkChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Attributes</Form.Label>
        <Table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((att, i) => {
              return (
                <tr key={i}>
                  <td>{att.trait_type}</td>
                  <td>{att.value}</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Attribute"
                  onChange={onNewAttributeChange}
                  value={newAttribute}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Value"
                  onChange={onNewAttributeValueChange}
                  value={newAttributeValue}
                />
              </td>
              <td>
                <Button variant="success" onClick={onAddAttributeClick}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter price"
          onChange={onPriceChange}
        />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" onClick={onCreateClick} className="mt-1">
          Create
        </Button>
      </Form.Group>
    </Container>
  );
};

export default Mint;
