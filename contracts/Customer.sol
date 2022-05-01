pragma solidity ^0.5.0;
import 'contracts/ShipmentDapp.sol';


contract Customer{

    string addressOfCustomer;
    string name;

    constructor(string memory _addressOfCustomer, string memory _name) public {
        addressOfCustomer = _addressOfCustomer;
        name = _name;
    }


}