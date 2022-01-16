pragma solidity ^0.8.0;
import "./ERC721.sol";

contract ERC721SubspaceCollection is ERC721 {
    uint256 public counter;
    string public contractURI;
    string public contractUriObjectId;
    string public objectId;

    mapping(uint256 => string) public tokenURIs;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _contractURI,
        string memory _contractUriObjectId,
        string memory _objectId
    ) ERC721(_name, _symbol, _contractUriObjectId, _objectId) {
        contractURI = _contractURI;
        contractUriObjectId = _contractUriObjectId;
        objectId = _objectId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return tokenURIs[tokenId];
    }

    function mint(address _to, string memory _tokenURI) public {
        counter += 1;
        tokenURIs[counter] = _tokenURI;
        _safeMint(_to, counter);
    }
}
