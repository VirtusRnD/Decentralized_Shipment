App = {
  web3Provider: null,
  contracts: {},
  
  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON("DecentralizedShipment.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.DecentralizedShipment = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.DecentralizedShipment.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render : function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        web3.eth.defaultAccount=web3.eth.accounts[0]
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    var deliveryInstance;
    App.contracts.DecentralizedShipment.deployed().then(function(instance) {
      deliveryInstance = instance;
      return deliveryInstance;
    });
  },

  /** 
   * This function is called when the users are need to be registered
   * It will link the user wallets to the blockchain 
   * */
  register_function : function() {
    var flag = 0;
    
    if (document.getElementById('customerinp').checked) {
      flag =1;
    }
    if (document.getElementById('sellerinp').checked) {
      flag =2;
    }
    if (document.getElementById('shipmentinp').checked)  {
      flag =3;
    }
    
    if (flag == 1) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_customer();
      }).then(
        function(result) {
          alert("Successfully registered as customer");
        }
      ).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if (flag == 2) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_seller();
      }).then(
        function(result) {
          alert("Successfully registered as seller");
        }
      ).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if (flag == 3) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_shipment();
      }).then(
        function(result) {
          alert("Successfully registered as shipment employee");
        }
      ).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
   
  },
  
  /** 
   * This function is called to store product name in session storage in order to prevent data loss when page is refreshed
   * */
  get_order_name: function(){
    sessionStorage.setItem("productName", "Product 1");
    var programList = document.getElementById("items");
    productName = programList.options[programList.selectedIndex].value;
    sessionStorage.setItem("productName", productName);
  },



  /************  Customer Functions  ************/

  /** 
   * This function is called for customer to place an order
   * */
  give_order : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.give_order([1],1);
    }).then(function(result){
      alert(sessionStorage.getItem("productName") + " Order Placed");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called for customer to view his/her order status
   * */
  check_order_status_customer : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_customer(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is not damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is damaged"));
        }
        else if(result[0].c[0] == 7 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is not damaged"));
        }
        else if(result[0].c[0] == 7  && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is damaged"));
        }
      }
    ).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called for customer to cancel his/her order
   * */
  cancel_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.cancel_order(1);
    }).then(function(result){
      alert("Order Cancelled");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called for customer to confirm the receivement of his/her order
   * */
  receive_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_order(1);
    }).then(function(result){
      alert("Order Received");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },



 /**Seller Functions */

  /** 
   * This function is called for seller to receive the order given by customer and to update the order status as preparing
   * */
  receive_and_prepare_the_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_and_prepare_the_order(1);
    }).then(function(result){
      alert("Order Received and Prepared");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called for seller to cancel his/her order
   * */
  transfer_order_to_shipment: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.transfer_order_to_shipment(1);
    }).then(function(result){
      alert("Order Transferred to Shipment");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called for seller to check the status of the order he/she shipped/will ship
   * */
  check_order_status_seller : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_seller(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is not damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is damaged"));
        }
        else if(result[0].c[0] == 7 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is not damaged"));
        }
        else if(result[0].c[0] == 7  && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is damaged"));
        }
      }
    ).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },



  /**Shipment Functions */

  /** 
   * This function is called for transferring the order from the shipment branch to on its way to the customer
   * */
  receive_and_ship_the_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_and_ship_the_order(1);
    }).then(function(result){
      alert("Order Received and Shipped");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

  /** 
   * This function is called to store order status in session storage in order to prevent data loss when page is refreshed
   * */
  get_status: function(){
    sessionStorage.setItem("orderStatus",1);
    var programList = document.getElementById("status");
    orderStatus = programList.options[programList.selectedIndex].value;
    sessionStorage.setItem("orderStatus",orderStatus);
  },

  /** 
   * This function is called for shipment company employee to update the status of the order he/she received to transfer
   * */
  update_status : function(){
    var flag = 0;
    if (document.getElementById('damaged').checked) {
      flag =1;
    }
    if (document.getElementById('notDamaged').checked) {
      flag =2;
    }

    if(sessionStorage.getItem("orderStatus") == 1 && flag === 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_otwtc_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 1 && flag === 1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_otwtc_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 2 && flag === 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_ofd_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 2 && flag === 1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_ofd_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 3 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_received_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 3 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_received_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 4 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_cancelled_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(sessionStorage.getItem("orderStatus") == 4 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_cancelled_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
  },

  /** 
   * This function is called for shipment company employee to check the status of the order he/she received to transfer/will receive to transfer
   * */
  check_order_status_shipment : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_shipment(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is in the branch and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is out for delivery and is damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is not damaged"));
        }
        else if(result[0].c[0] == 6 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is received and is damaged"));
        }
        else if(result[0].c[0] == 7 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is not damaged"));
        }
        else if(result[0].c[0] == 7  && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is cancelled and is damaged"));
        }
      }
    ).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
