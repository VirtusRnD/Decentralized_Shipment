pragma solidity ^0.5.0;
import 'contracts/ShipmentDapp.sol';


contract Customer{

    string shipmentAddressOfCustomer;
    string name;

    constructor(string memory _shipmentAddressOfCustomer, string memory _name) public {
        shipmentAddressOfCustomer = _shipmentAddressOfCustomer;
        name = _name;
    }

    function order(Product memory _product) public payable{
        orderId++;
        return Order(orderId, "order1", _product, OrderStatus.PREPARING, false);
    }

    function checkOrderStatus(uint _orderId) public view returns (OrderStatus){
        return Order(_orderId).productStatus;
    }
    function cancelTheOrder(uint _orderId) public {
        Order(_orderId).productStatus = OrderStatus.CANCELLED;
    }


}