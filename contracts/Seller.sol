pragma solidity ^0.5.0;
import 'contracts/ShipmentDapp.sol';

contract Seller  {

    uint constant productId = 0;
    struct Product{
        uint id;
        string name;
        uint price;
        uint quantity;
    }
    function toString(uint256 _value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function concatenate(string memory _a, string memory _b) internal returns(string memory) {
        return abi.encodePacked(a,b);

    }


    function createProduct(string memory _name) public returns(Product){
        productId++;
        string productIdString = toString(productId);
        string memory productName = concatenate(_name, " ");
        productName = concatenate(productName, productIdString);
        return Product(productId, productName ,100,10);
    }
    function receiveOrder(Product _product) returns(Order){

    }
}


