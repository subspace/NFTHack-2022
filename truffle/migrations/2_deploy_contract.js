const ERC721SubspaceCollection = artifacts.require("ERC721SubspaceCollection");

module.exports = async function (deployer) {
  await deployer.deploy(
    ERC721SubspaceCollection,
    "Sample Subspace Vault Collection",
    "SSVC",
    "ipfs://QmU9Q6a6Y3bbA4kZk5BuGDEYT2F8ckYFsrBMHGquz1FFVH",
    "QmU9Q6a6Y3bbA4kZk5BuGDEYT2F8ckYFsrBMHGquz1FFVH",
    "QmU9Q6a6Y3bbA4kZk5BuGDEYT2F8ckYFsrBMHGquz1FFVH"
  );
};
