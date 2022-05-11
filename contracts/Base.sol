pragma solidity ^0.5.0;


contract Base {

    // Order status enum that will be used in our system in order to know the status of the order.
    enum OrderStatus {
        PREPARING,  // Order is being prepared.
        ONTHEWAY,   //  Order is on the way.
        RECEIVED,   //  Order is received.
        CANCELLED   //  Order is cancelled by user.
    }
    // Product struct which contains product details that will be used in our system in order to create product.
    struct Product{
        uint id;        //This is the ID of the product and it's unique.
        string name;    //This is the name of the product.
        uint price;     //This is the price of the product.
        uint quantity;  //This is the quantity of the product.
    }
    // Order struct which contains order details that will be used in our system in order to create order.
    struct Order{
        uint orderId;               //This is the ID of the order and it's unique.
        string orderName;           //This is the name of the order.
        Product product;            //This is the product that will be ordered.
        OrderStatus orderStatus;    //This is the status of the order.
        bool isDamaged;             //This represents the order being damaged or not.
    }
}