pragma solidity ^0.5.0;

contract DecentralizedShipment {
    uint product_cost = 5; //Cost of the product
    uint shipment_count = 0; //Count of the shipment company employee
    uint seller_count = 0; //Count of the seller 
    uint customer_count = 0; //Count of the customer
    uint order_count = 0; //Count of the order

     // Order status enum that will be used in our system in order to know the status of the order.
    enum OrderStatus {
        ordered,    // The order has been placed by the customer.
        preparing,  // Order is being prepared.
        ontheway,   //  Order is on the way.
        outfordelivery, // Order is out for delivery.
        received,   //  Order is received.
        cancelled   //  Order is cancelled by user.
    }
    enum ProductStatus{
        damaged, //Status of the product is damaged
        not_damaged //Status of the product is not damaged
    }
    
    // Order struct which contains order details that will be used in our system in order to create order.
    struct Order{
        uint id;                    //This is the ID of the order and it's unique.
        uint[] products;            //This is the array of products that will be ordered.
        uint price;                 //This is the total price of the order.
        uint seller;                //This is the seller of the order.
        uint shipment;              // This is the shipment of the order.    
        uint customer;              //This is the customer of the order.
        OrderStatus status;         //This is the status of the order.
        ProductStatus pStatus;      //This represents the order being damaged or not.
    }
 

    // This is the struct of the customer which contains customer details.
    struct Customer {
        uint id;         
        uint cur_order;
        uint last_order;
    }
    //This is the struct of the seller which contains seller details.
    struct Seller {
        uint id;
        uint[] product_list;
    }
    //This is the struct of the shipment which contains shipment details.
    struct Shipment {
        uint id;
        uint cur_order;
        uint order_count;
    }
    //This is the mapping customer details.
    mapping(uint => Customer) customer_details;
    //This is the mapping seller details.
    mapping(uint => Seller) seller_details;
    //This is the mapping shipment details.
    mapping(uint => Shipment) shipment_details;
    //This is the mapping order details.
    mapping(uint => Order) order_details;
    ,
    mapping(address => uint) get_seller_id;
    mapping(address => uint ) get_shipment_id;
    mapping(address => uint) get_customer_id;
    
    
    /* ---------------EVENTS----------------- */
    
    event order_status_update(uint order_id, OrderStatus status);
    event order_damaged_update(uint order_id, ProductStatus pStatus);
    
    /* ---------------MODIFIERS-------------- */
    
    modifier is_customer() {
        require(get_customer_id[msg.sender] > 0, "You aren't registered as a customer");
        _;
    }
    
    modifier is_shipment() {
        require(get_shipment_id[msg.sender] > 0, "You aren't registered as a shipment");
        _;
    }
    
    modifier is_seller() {
        require(get_seller_id[msg.sender] > 0, "You aren't registered as a seller");
        _;
    }
    
    modifier has_ordered() {
        require(customer_details[get_customer_id[msg.sender]].cur_order != 0, "You don't have any active orders");
        _;
    }
    
    /* ---------------UTILITY FUNCTIONS------ */
    function product_exists(uint item, uint seller_id) 
    public view returns(bool) {
        uint i;
        for (i = 0; i < seller_details[seller_id].product_list.length; i++) {

            
            if (seller_details[seller_id].product_list[i] == item) {
                
                return true;
            }
        }
        return false;
    }
    function get_id() public view returns(uint) {
        uint id;
        id = get_customer_id[msg.sender];
        if (id != 0)
            return id;
            
        id = get_shipment_id[msg.sender];
        if (id != 0)
            return id;
            
        id = get_seller_id[msg.sender];
        if (id != 0)
            return id;
            
        require(id != 0, "You aren't registered");
        return 0;
    }
    



    /* ---------------CUSTOMER--------------- */

    /**
        * @dev This function is used to register a customer in the system.
        */
     */
    function register_customer() public returns(bool) {
        
        require(get_customer_id[msg.sender] == 0, "Customer already registered");
        customer_count++;
        Customer storage customer = customer_details[customer_count];
        customer.id = customer_count;
        customer.cur_order = 0;
        customer_details[customer.id] = customer;
        get_customer_id[msg.sender] = customer.id;
        return true;
    }
    /**
        * @dev This function is used to give an order to a customer.
        * @param product_id This is the product id of the product that is being ordered.
        * @param seller_id This is the seller id of the seller who is selling the product.
    */
    function give_order(uint product_id, uint seller_id) is_customer() public payable returns(bool) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(customer_details[get_customer_id[msg.sender]].cur_order == 0, "Already given order");
        require(product_exists(product_id, seller_id) == true, "Item doesn't exist");

        order_count++;
        Order storage order = order_details[order_count];
        order.id = order_count;
        order.products = [product_id];
        order.price = [product_id].length * product_cost;
        order.status = OrderStatus.ordered;
        order.seller = seller_id;
        order.customer = get_customer_id[msg.sender];
        order.pStatus = ProductStatus.not_damaged;
        
        customer_details[get_customer_id[msg.sender]].cur_order = order.id;
        emit order_status_update(order.id, order.status);
        return true;
    }
    /**
        * @dev This function is used to checking the order status.
        * @param order_id This is the order id of the order that is checking status.
    */
    function check_order_status_customer(uint order_id, uint seller_id) is_customer()  has_ordered() public view returns(OrderStatus,ProductStatus) {
        require(seller_id <= seller_count, "Seller doesn't exist");  //Checking if seller exists.
        require(order_id <= order_count, "Order doesn't exist");     //Checking if order exists.
    
        /*if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged){
            return (4,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (5,1);
        }else {
            return (5,0);
        }*/
        return (order_details[order_id].status,order_details[order_id].pStatus);
    }
    /**
        * @dev Function to cancel an order.
        * @param order_id The id of the order to be cancelled.
        * @param seller_id The id of the seller who is cancelling the order.
        * @returns True if the order is cancelled, false otherwise.
        */
    function cancel_order(uint order_id) is_customer() has_ordered() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");     //Checking if order exists.
        require(order_details[order_id].customer == get_customer_id[msg.sender], "You don't have this order");      
        require(order_details[order_id].status != OrderStatus.received, "Order is already received");               
        require(order_details[order_id].status != OrderStatus.cancelled, "You have already cancel this order!");    
        order_details[order_id].status = OrderStatus.cancelled;                                                     
        order_details[order_id] = order_details[order_count];                                                       
        emit order_status_update(order_id, order_details[order_id].status);                                       
        return true;                                                                     
    }
    /**
        * @dev This function is used for the receiving the order.
        * @param order_id The id of the order to be received.
        * @returns True if the order is received, false otherwise.
        */
    function receive_order(uint order_id) is_customer() has_ordered() public returns(bool)  {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.outfordelivery, "Order is not out for delivery");
        require(order_details[order_id].customer == get_customer_id[msg.sender], "You don't have this order");
        order_details[order_id].status = OrderStatus.received;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }

    /* ---------------SELLER--------------- */

    /**
        * @dev This function is used to add a new seller.
        * @returns True if the seller is added, false otherwise.
    */
    function register_seller() public returns(bool) {
        require(get_seller_id[msg.sender] == 0, "Seller already registered");

        seller_count++;
        Seller storage seller = seller_details[seller_count];
        seller.id = seller_count;
        seller.product_list.push(1);
        seller.product_list.push(2);
        seller.product_list.push(3);
        seller.product_list.push(4);
        seller.product_list.push(5);
        seller_details[seller.id] = seller;
        get_seller_id[msg.sender] = seller.id;
        return true;
    }
    /**
        * @dev This function is used receive the order by the seller.
        * @param order_id The id of the seller to be preparing.
        */
    function receive_and_prepare_the_order(uint order_id) is_seller() public returns(bool) {
        uint seller_id = get_seller_id[msg.sender];
        require(order_details[order_id].seller == seller_id, "Not your order");
        require(order_details[order_id].status != OrderStatus.preparing, "Already accepted this order");
        order_details[order_id].status = OrderStatus.preparing;
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }
    /**
        * @dev This function is used to transfer the order to the delivery person.
        * @param order_id The id of the order to be delivered.
        * @returns True if the order is delivered, false otherwise.
    */
    function transfer_order_to_shipment(uint order_id) is_seller() public payable returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.preparing, "Order is not prepared");
        order_details[order_id].status = OrderStatus.ontheway;
        return true
    }
    /**
        * @dev This function is used to checking the order status.
        * @param order_id This is the order id of the order that is checking status.
    */
    function check_order_status_seller(uint order_id, uint seller_id) is_seller()  public view returns(OrderStatus, ProductStatus) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
    
        /*if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged){
            return (4,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (5,1);
        }else {
            return (5,0);
        }*/
        return (order_details[order_id].status,order_details[order_id].pStatus);
        
    }

    /* ---------------SHIPMENT--------------- */
    
    /**
        * @dev This function is used to add a new delivery person.
        * @returns True if the seller is added, false otherwise.
        */
    function register_shipment() public returns(bool) {
        require(get_shipment_id[msg.sender] == 0, "Shipment already registered");
        shipment_count++;
        Shipment storage shipment = shipment_details[shipment_count];
        shipment.id = shipment_count;
        shipment_details[shipment.id] = shipment;
        get_shipment_id[msg.sender] = shipment.id;
        return true;
    }
    /**
        * @dev This function is used receive the order from the delivery person.
        * @param order_id The id of the seller to be preparing.
    */
    function receive_and_ship_the_order(uint order_id) is_shipment() public returns(bool) {
        uint shipment_id = get_shipment_id[msg.sender];
        require(shipment_details[shipment_id].cur_order == 0, "Already delivering another order");
        order_details[order_id].status = OrderStatus.ontheway;
        order_details[order_id].shipment = get_shipment_id[msg.sender];
        shipment_details[shipment_id].cur_order = order_id;
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }
    /**
        * @dev This function is used to update the order status to outfordelivery and damaged.
        * @param order_id The id of the order to be delivered.
    */
    function update_status_to_ofd_and_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.outfordelivery;
        order_details[order_id].pStatus = ProductStatus.damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
    /**
        * @dev This function is used to update the order status to outfordelivery and not damaged.
        * @param order_id The id of the order to be updated.
    */
    function update_status_to_ofd_and_not_damaged(uint order_id) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.outfordelivery;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }
    /**
        * @dev This function is used to update the order status to received and damaged.
        * @param order_id The id of the order to be updated.
    */
    function update_status_to_received_and_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway ||order_details[order_id].status == OrderStatus.outfordelivery , "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.received;
        order_details[order_id].pStatus = ProductStatus.damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
    /**
        * @dev This function is used to update the order status to received and not damaged.
        * @param order_id The id of the order to be updated.
    */
    function update_status_to_received_and_not_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway ||order_details[order_id].status == OrderStatus.outfordelivery , "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.received;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }
    /**
        * @dev This function is used to update the order status to cancelled and damaged.
        * @param order_id The id of the order to be updated.
    */
    function update_status_to_cancelled_and_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status != OrderStatus.received, "Order is already received");
        order_details[order_id].status = OrderStatus.cancelled;
        order_details[order_id].pStatus = ProductStatus.damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
    /**
        * @dev This function is used to update the order status to cancelled and not damaged.
        * @param order_id The id of the order to be updated.
    */
    function update_status_to_cancelled_and_not_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
       require(order_details[order_id].status != OrderStatus.received, "Order is already received");
        order_details[order_id].status = OrderStatus.cancelled;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }

    /**
        * @dev This function is used to checking the order status.
        * @param order_id This is the order id of the order that is checking status.
    */
   function check_order_status_shipment(uint order_id, uint seller_id) is_shipment()  public view returns(OrderStatus,ProductStatus) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
    
        /*if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.ordered && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged){
            return (4,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (5,1);
        }else {
            return (5,0);
        }*/
        return (order_details[order_id].status,order_details[order_id].pStatus);
    }

  
    
}