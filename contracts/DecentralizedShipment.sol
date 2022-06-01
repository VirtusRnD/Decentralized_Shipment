pragma solidity ^0.5.0;

contract DecentralizedShipment {
    uint delivery_fee = 1;
    uint product_cost = 5;
    uint shipment_count = 0;
    uint seller_count = 0;
    uint customer_count = 0;
    uint order_count = 0;
    uint time_limit = 5;
    
  
     // Order status enum that will be used in our system in order to know the status of the order.
    enum OrderStatus {
        preparing,  // Order is being prepared.
        ontheway,   //  Order is on the way.
        outfordelivery, // Order is out for delivery.
        received,   //  Order is received.
        cancelled   //  Order is cancelled by user.
    }
    enum ProductStatus{
        damaged,
        not_damaged
    }
    
    // Order struct which contains order details that will be used in our system in order to create order.
    struct Order{
        uint id;                    //This is the ID of the order and it's unique.
        uint[] products;            //This is the array of products that will be ordered.
        uint price;                 //This is the total price of the order.
        uint seller;                //This is the seller of the order.
        uint shipment;              // This is the shipment of the order.    
        uint customer;              //This is the customer of the order.
        OrderStatus status;     //This is the status of the order.
        ProductStatus pStatus;           //This represents the order being damaged or not.
    }
 

    struct Customer {
        uint id;
        uint cur_order;
        uint last_order;
    }
    
    struct Seller {
        uint id;
        uint[] product_list;
    }
    
    struct Shipment {
        uint id;
        uint cur_order;
        uint order_count;
    }
    
    
    
    mapping(uint => Customer) customer_details;
    mapping(uint => Seller) seller_details;
    mapping(uint => Shipment) shipment_details;
    mapping(uint => Order) order_details;
    
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
    
    function give_order(uint[] memory products, uint seller_id) is_customer() public payable returns(bool) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(customer_details[get_customer_id[msg.sender]].cur_order == 0, "Already given order");
        //require(products.length * product_cost + delivery_fee == msg.value, "Insufficient amount");
        uint i;
        for (i = 0; i < products.length; i++) {
            require(product_exists(products[i], seller_id) == true, "Item doesn't exist");
        }

        order_count++;
        Order storage o = order_details[order_count];
        o.id = order_count;
        o.products = products;
        o.price = products.length * product_cost;
        o.status = OrderStatus.preparing;
        o.seller = seller_id;
        o.customer = get_customer_id[msg.sender];
        o.pStatus = ProductStatus.not_damaged;
        
        customer_details[get_customer_id[msg.sender]].cur_order = o.id;
        emit order_status_update(o.id, o.status);
        return true;
    }
    function check_order_status_customer(uint order_id, uint seller_id) is_customer() has_ordered() public view returns(uint,uint) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
    
        if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else {
            return (4,0);
        }
    }
    function cancel_order(uint order_id) is_customer() has_ordered() public returns(OrderStatus) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].customer == get_customer_id[msg.sender], "You don't have this order");
        require(order_details[order_id].status != OrderStatus.cancelled, "You have already cancel this order!");
        order_details[order_id].status = OrderStatus.cancelled;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return order_details[order_id].status ;
    }

    function receive_order(uint order_id) is_customer() has_ordered() public returns(OrderStatus)  {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.outfordelivery, "Order is not out for delivery");
        require(order_details[order_id].customer == get_customer_id[msg.sender], "You don't have this order");
        order_details[order_id].status = OrderStatus.received;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        return order_details[order_id].status;
    }

    /* ---------------SELLER--------------- */

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
    function receive_and_prepare_the_order(uint order_id) is_seller() public returns(bool) {
        uint seller_id = get_seller_id[msg.sender];
        require(order_details[order_id].seller == seller_id, "Not your order");
        require(order_details[order_id].status == OrderStatus.preparing, "Already accepted this order");
        order_details[order_id].status = OrderStatus.preparing;
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }

    function transfer_order_to_shipment(uint order_id) is_seller() has_ordered() public payable returns(OrderStatus) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.preparing, "Order is not prepared");
        order_details[order_id].status = OrderStatus.ontheway;
        return order_details[order_id].status;
    }

    function check_order_status_seller(uint order_id, uint seller_id) is_seller() has_ordered() public view returns(uint, uint) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
         require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
    
        if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else {
            return (4,0);
        }
    }

    /* ---------------SHIPMENT--------------- */
    
    function register_shipment() public returns(bool) {
        require(get_shipment_id[msg.sender] == 0, "Shipment already registered");
        shipment_count++;
        Shipment storage shipment = shipment_details[shipment_count];
        shipment.id = shipment_count;
        shipment_details[shipment.id] = shipment;
        get_shipment_id[msg.sender] = shipment.id;
        return true;
    }
    function receive_and_ship_the_order(uint order_id) is_shipment() public returns(bool) {
        uint shipment_id = get_shipment_id[msg.sender];
        require(order_details[order_id].shipment == shipment_id, "Not your order");
        require(order_details[order_id].status == OrderStatus.ontheway, "Already accepted this order");
        order_details[order_id].status = OrderStatus.ontheway;
        emit order_status_update(order_id, order_details[order_id].status);
        return true;
    }
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
    function update_status_to_ofd_and_not_damaged(uint order_id) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.outfordelivery;
        order_details[order_id].pStatus = ProductStatus.not_damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
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
    function update_status_to_received_and_not_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        require(order_details[order_id].status == OrderStatus.ontheway ||order_details[order_id].status == OrderStatus.outfordelivery , "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.received;
        order_details[order_id].pStatus = ProductStatus.not_damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
     function update_status_to_cancelled_and_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        require(order_details[order_id].status == OrderStatus.ontheway ||order_details[order_id].status == OrderStatus.outfordelivery , "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.cancelled;
        order_details[order_id].pStatus = ProductStatus.damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
     function update_status_to_cancelled_and_not_damaged(uint order_id ) is_shipment() public returns(bool) {
        require(order_id <= order_count, "Order doesn't exist");
        require(order_details[order_id].status == OrderStatus.ontheway, "Order is not on the way or not out for delivery");
        require(order_details[order_id].status == OrderStatus.ontheway ||order_details[order_id].status == OrderStatus.outfordelivery , "Order is not on the way or not out for delivery");
        order_details[order_id].status = OrderStatus.cancelled;
        order_details[order_id].pStatus = ProductStatus.not_damaged;
        order_details[order_id] = order_details[order_count];
        emit order_status_update(order_id, order_details[order_id].status);
        emit order_damaged_update(order_id, order_details[order_id].pStatus);
        return true;
    }
    function check_order_status_shipment(uint order_id, uint seller_id) is_shipment() has_ordered() public view returns(uint,uint) {
        require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
         require(seller_id <= seller_count, "Seller doesn't exist");
        require(order_id <= order_count, "Order doesn't exist");
    
        if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (0,1);
        }else if(order_details[order_id].status == OrderStatus.preparing && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (0,0);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.damaged) {
            return (1,1);
        }else if(order_details[order_id].status == OrderStatus.ontheway && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (1,0);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (2,1);
        }else if(order_details[order_id].status == OrderStatus.outfordelivery && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (2,0);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (3,1);
        }else if(order_details[order_id].status == OrderStatus.received && order_details[order_id].pStatus == ProductStatus.not_damaged) {
             return (3,0);
        }else if(order_details[order_id].status == OrderStatus.cancelled && order_details[order_id].pStatus == ProductStatus.damaged) {
             return (4,1);
        }else {
            return (4,0);
        }
    }

  
    
}