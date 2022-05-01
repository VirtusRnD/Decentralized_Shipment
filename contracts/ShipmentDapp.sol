pragma solidity ^0.5.0;

contract ShipmentDapp {

    enum OrderStatus {
        PREPARING,
        ONTHEWAY,
        RECEIVED
    }
    struct Product{
        uint id;
        string name;
        uint price;
        uint quantity;
    }
    
    struct Order{
        uint OrderId;
        string orderName;
        Product[] product;
        OrderStatus prductStatus;
        bool isDamaged;
    }
    


}