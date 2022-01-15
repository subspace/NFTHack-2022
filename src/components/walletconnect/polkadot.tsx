import { useState } from "react";
import { Button } from "react-bootstrap";
import { SubspaceClient, Identity } from "@subspace/subspace";

const NODE_WS_PROVIDER = process.env.REACT_APP_NODE_WS_PROVIDER;
const FARMER_WS_PROVIDER = process.env.REACT_APP_FARMER_WS_PROVIDER;

export interface PolkadotConnectProps {
  setSelectedAccountAddress: (address: string) => void;
  setSubspaceClient: (client: SubspaceClient) => void;
  setIdentity: (identity: Identity) => void;
}

const PolkadotConnectButton: React.FC<PolkadotConnectProps> = ({
  setSelectedAccountAddress,
  setSubspaceClient,
  setIdentity,
}) => {
  const [disableConnectButton, setDisableConnectButton] =
    useState<boolean>(false);

  const onConnectToPolkadotClick = async () => {
    const identity = await Identity.fromWeb3();
    if (identity) {
      setIdentity(identity);

      const subspaceClient = await SubspaceClient.connect(
        identity,
        NODE_WS_PROVIDER,
        FARMER_WS_PROVIDER
      );
      setSubspaceClient(subspaceClient);
      setSelectedAccountAddress(identity.getKeyringPair().address);
      setDisableConnectButton(true);
    } else {
      alert("Please install Polkadot Extension");
    }
  };

  return (
    <Button
      className="ml-2"
      variant="secondary"
      onClick={onConnectToPolkadotClick}
      disabled={disableConnectButton}
    >
      Connect to Subspace with Polkadot Extension
    </Button>
  );
};

export default PolkadotConnectButton;
