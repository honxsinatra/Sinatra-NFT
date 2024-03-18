// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract basicNFT is ERC721 {
    string public constant TOKEN_URI1 =
        "https://ipfs.io/ipfs/QmXsGnz5MA7dsES2HLaNFxzfaKb4hnvX96LZvKaxSShDDB?filename=unyama.png";
    string public constant TOKEN_URI2 = "";
    string public constant TOKEN_URI3 = "";
    uint256 private s_tokenCounter;
    uint256 private random_Number;

    //Array of NFTs
    string[3] sinatraNFT = [TOKEN_URI1, TOKEN_URI2, TOKEN_URI3];

    constructor() ERC721("Sinatra NFT", "SN") {
        s_tokenCounter = 0;
    }

    function request_Honx_NFT() public returns (string memory) {
        return sinatraNFT[random_Number];
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
        return s_tokenCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public pure override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
