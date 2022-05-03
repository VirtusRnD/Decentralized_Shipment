pragma solidity ^0.5.0;
import 'contracts/ShipmentDapp.sol';

contract Seller  {

    //This is the ID of the product and it's unique.
    //It is incremented every time a new product is added.
    uint productId = 0;

    //Product is a struct which contains the product details.
    struct Product{
        uint id;
        string name;
        uint price;
        uint quantity;
    }

    constructor() public {
        createProduct("product1", 100, 10);
        createProduct("product2", 200, 20);
        createProduct("product3", 300, 30);
        createProduct("product4", 400, 40);
    }
    // This function create product and return product in order to use products in our system.
    // TODO: returns Product gives error solve it.-> I wrote memory maybe it is not good.
    function createProduct(string memory _name,uint _price, uint _quantity) public returns(Product memory){

        productId++; //Increment productId.
        
        return Product(productId, _name ,_price,_quantity); //Create product and return it.

    }
    // This function is used to receive order.
    function receiveOrder(Product memory _product, string memory _orderName) public returns(Order memory){
        return Order(1, "order1", _product, OrderStatus.PREPARING, false);

    }
}


