import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { prettyHash } from "../utils";

export interface NavBarWrapperProps {
  address: string;
  accountAddress: string;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({
  address,
  accountAddress,
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
            {address.length > 0 ? (
              <>
                Ethereum: <a href="#">{prettyHash(address, 6, 6)}</a>
              </>
            ) : (
              "Ethereum not connected"
            )}
          </Navbar.Text>
          <Navbar.Text>
            <span className="ml-2 mr-2"> | </span>
          </Navbar.Text>
          <Navbar.Text>
            {accountAddress.length > 0 ? (
              <>
                Subspace: <a href="#">{prettyHash(accountAddress, 6, 6)}</a>
              </>
            ) : (
              "Subspace not connected"
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarWrapper;
