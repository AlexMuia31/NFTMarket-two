//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


struct NFTListing{
    uint256 price;
    address seller;
}

contract NFTMarket is ERC721URIStorage, Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    using SafeMath for uint256;
    mapping(uint256 => NFTListing) private _listings;

   


    //event
    //if tokenURI is not an empty string then an NFT was created
    //if price is not 0 then an NFT was listed
    //if price is 0 and tokenURI is an empty string then NFT was transferred (either bought, or the listing was cancelled)
    event NFTTransfer(uint256 tokenID,address to, string tokenURI, uint256 price);

    constructor() ERC721("ALEX NFT","Aleki"){}

    //mint an NFT
    function createNFT(string calldata tokenURI) public {
        _tokenIDs.increment();
        uint256 currentID =_tokenIDs.current();
        _safeMint(msg.sender, currentID);
        _setTokenURI(currentID, tokenURI);
        emit NFTTransfer(currentID, msg.sender, tokenURI, 0);
    
    }

    //Listing an NFT

    function listNFT(uint256 tokenID, uint256 price) public{
        require(price > 0, "NFTMarket: Price must be greater than 0");
        //approving Transfer NFT ownership and making sure the user is the owner of the NFT
        approve(address(this), tokenID);
        //transfer ownership of NFT to marketplace Contract
        transferFrom(msg.sender, address(this), tokenID);
        //storing Listing data into the mapping
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, address(this), "", price);
    }

    // BuyNFt
    function buyNFT(uint256 tokenID) public payable{
        //checking if the tokenID is listed for sell
        NFTListing memory listing = _listings[tokenID];
        //amount of WEI paid for the NFT should be greater than zero
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        //amount of WEI should be equal to price of NFT
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        //transfer of NFT from market to buyer
        transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        // deducting market fee
        payable(msg.sender).transfer(listing.price.mul(95).div(100));
        emit NFTTransfer(tokenID, msg.sender, "", 0);

    }

    //cancel listing function
    function cancelListing(uint256 tokenID) public{
        //checking if the NFT is in the listing
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0,"NFTMarket: nft not listed for sale");
        require(listing.seller == msg.sender,"NFTMarket: you are not the owner");
        transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, msg.sender, "", 0);

    }

    //withdrawing funds

    function withdrawFunds() public onlyOwner{
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTMarket: balance is zero");
        payable(owner()).transfer(balance);
    }

    //clear listing from the mapping
    function clearListing(uint256 tokenID) private{
        _listings[tokenID].price=0;
        _listings[tokenID].seller=address(0);
    }

}


