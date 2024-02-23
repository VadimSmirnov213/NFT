// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WhitelistNFT is ERC721, Ownable {
    uint256 public currentSupply = 0;
    uint256 public immutable eventId;
    mapping(address => bool) public whitelist;
    string public baseURI;
    bool public published;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _eventId,
        string memory _baseUri,
        address[] memory _addresses,
        bool _published
    ) ERC721(name, symbol) {
        require(_addresses.length > 0, "_addresses should not be empty");
        eventId = _eventId;
        baseURI = _baseUri;
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
        if (_published) {
            publish();
        }
    }

    function claimNFT() external returns (uint256 tokenId) {
        require(published, "Event is not published");
        require(whitelist[msg.sender], "Address not whitelisted");
        tokenId = currentSupply + 1;

        _safeMint(msg.sender, tokenId);
        currentSupply++;
    }

    function publish() public onlyOwner {
        published = true;
    }

    function _baseURI() internal view override returns (string memory) {
        return string.concat(baseURI, "/", Strings.toString(eventId), "/");
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        _requireMinted(tokenId);

        string memory base = _baseURI();
        return
            bytes(base).length > 0
                ? string.concat(base, Strings.toString(tokenId), ".json")
                : "";
    }
}
