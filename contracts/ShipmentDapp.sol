pragma solidity ^0.5.0;

contract ShipmentDapp {

    uint productId = 0;
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
        uint OrderId;
        string orderName;
        Product product;
        OrderStatus orderStatus;
        bool isDamaged;
    }


}