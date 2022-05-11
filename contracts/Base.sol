pragma solidity ^0.5.0;


contract Base {

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
        uint orderId;
        string orderName;
        Product product;
        OrderStatus orderStatus;
        bool isDamaged;
    } 
    
}