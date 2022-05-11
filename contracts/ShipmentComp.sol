pragma solidity ^0.5.0;


contract ShipmentComp {

    mapping(uint => Order) orders;


    function signOrderDamaged(uint _orderId) public {
        orders[orderId].isDamaged = true;
    }
    
    function transferOrder2Customer(uint _orderId) public {
        require(orders[_orderId].isDamaged == false);
        require(orders[_orderId].orderStatus == OrderStatus.ONTHEWAY);
        orders[_orderId].orderStatus = OrderStatus.RECEIVED;
    }
}
