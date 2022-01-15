import { Identity, SubspaceClient } from "@subspace/subspace";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { prettyHash } from "../utils";
import WalletConnectButton from "../walletconnect/ethereum";
import PolkadotConnectButton from "../walletconnect/polkadot";

export interface NavBarWrapperProps {
  address: string;
  accountAddress: string;
  setSelectedAccountAddress: (address: string) => void;
  setSubspaceClient: (client: SubspaceClient) => void;
  setIdentity: (identity: Identity) => void;
  setProvider: (provider: Web3) => void;
  setConnectedAddress: (address: string) => void;
  setChainId: (chainId: string) => void;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({
  address,
  accountAddress,
  setSelectedAccountAddress,
  setSubspaceClient,
  setIdentity,
  setProvider,
  setConnectedAddress,
  setChainId,
}) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            width="30"
            height="30"
            alt="..."
            src={require("../../assets/img/logo_50x50px.svg").default}
          />
          <span className="pl-2">NFT Storage Demo</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/item">
              Create Item
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/collection">
              Collection
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <WalletConnectButton
              setChainId={setChainId}
              setConnectedAddress={setConnectedAddress}
              setProvider={setProvider}
            ></WalletConnectButton>

            {address.length > 0 ? (
              <>
                Ethereum: <a href="#">{prettyHash(address, 6, 6)}</a>
              </>
            ) : null}
          </Navbar.Text>
          <Navbar.Text>
            <PolkadotConnectButton
              setSelectedAccountAddress={setSelectedAccountAddress}
              setSubspaceClient={setSubspaceClient}
              setIdentity={setIdentity}
            ></PolkadotConnectButton>

            {accountAddress.length > 0 ? (
              <>
                Subspace: <a href="#">{prettyHash(accountAddress, 6, 6)}</a>
              </>
            ) : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarWrapper;
