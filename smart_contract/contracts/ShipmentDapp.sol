pragma solidity ^0.5.0;
import './Customer.sol';
import './Seller.sol';
import './ShipmentComp.sol';

contract ShipmentDapp is Customer, Seller, ShipmentComp {

    uint orderId  = 0;

    enum OrderStatus {
        PREPARING,
        ONTHEWAY,
        RECEIVED,
        CANCELLED
    }
    struct Product{
        uint id;
        string name;
        uint price;
        uint quantity;
    }

    struct Order{
        string orderName;
        Product product;
        OrderStatus orderStatus;
        bool isDamaged;
    }
    


}