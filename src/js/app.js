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

  register_function : function() {
    var flag = 0;
    
    if (document.getElementById('customerinp').checked) {
      flag =1;
    }
    if (document.getElementById('restaurantinp').checked) {
      flag =2;
    }
    if (document.getElementById('courierinp').checked)  {
      flag =3;
    }
    
    if (flag == 1) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_customer();
      }).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if (flag == 2) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_seller();
      }).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if (flag == 3) {
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_shipment();
      }).catch(function(err) {
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
   
  },
  
  get_order_name: function(){
    var programList = document.getElementById("items");
    productName = programList.options[programList.selectedIndex].value;
    sessionStorage.setItem("productName", productName);
  },



  /************  Customer Functions  ************/

  give_order : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.give_order([1],1);
    }).then(function(result){
      alert(sessionStorage.getItem("productName") + " Order Placed");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },
  check_order_status_customer : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_customer(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is not damaged"));
        }
        else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is not damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is not damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is  damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is damaged"));
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


  cancel_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.cancel_order(1);
    }).then(function(result){
      alert("Order Cancelled");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },

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
 receive_and_prepare_the_order: function(){
  App.contracts.DecentralizedShipment.deployed().then(function(instance){
    return instance.receive_and_prepare_the_order(1);
  }).then(function(result){
    alert("Order Received and Prepared");
  }).catch(function(err){
    alert((err.message.split('"')[9].split("revert ")[1]));
  });
},

 transfer_order_to_shipment: function(){
  App.contracts.DecentralizedShipment.deployed().then(function(instance){
    return instance.transfer_order_to_shipment(1);
  }).then(function(result){
    alert("Order Transferred to Shipment");
  }).catch(function(err){
    alert((err.message.split('"')[9].split("revert ")[1]));
  });
 },


  check_order_status_seller : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_seller(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is not damaged"));
        }
        else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is not damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is not damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is  damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is damaged"));
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

  /** This method is used for transferring the order from the shipment branch to on its way to the customer */
  receive_and_ship_the_order: function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_and_ship_the_order(1);
    }).then(function(result){
      alert("Order Received and Shipped");
    }).catch(function(err){
      alert((err.message.split('"')[9].split("revert ")[1]));
    });
  },
  get_status: function(){
    var programList = document.getElementById("status");
    orderStatus = programList.options[programList.selectedIndex].value;
  },

  update_status : function(){
    var flag = 0;
    if (document.getElementById('damaged').checked) {
      flag =1;
    }
    if (document.getElementById('notDamaged').checked) {
      flag =2;
    }

    if(orderStatus == 1 && flag === 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_otwtc_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 1 && flag === 1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_otwtc_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 2 && flag === 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_ofd_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 2 && flag === 1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_ofd_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated");
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 3 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_received_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 3 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_received_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 4 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_cancelled_and_not_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
    if(orderStatus == 4 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        return instance.update_status_to_cancelled_and_damaged(1);
      }).then(function(result){
        alert("Order Status Updated")
      }).catch(function(err){
        alert((err.message.split('"')[9].split("revert ")[1]));
      });
    }
  },

  
 check_order_status_shipment : function(){

    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.check_order_status_shipment(1,1);
    }).then( 
      function(result){
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is not damaged"));
        }
        else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ordered and is damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is not damaged"));
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is preparing and is damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is not damaged"));
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to shipment and is  damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is not damaged"));
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is on the way to customer and is damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is not damaged"));
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is ontheway and is damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is not damaged"));
        }
        else if(result[0].c[0] == 5 && result[1].c[0] == 0){
          alert("Order Status\nOrder that contains " + (sessionStorage.getItem("productName") + " is outfordelivery and is damaged"));
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
