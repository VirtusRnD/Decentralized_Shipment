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
        console.log(err);
      });
    }
    if (flag == 2) {
      console.log("here");
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_seller();
      }).catch(function(err) {
        console.log(err);
      });
    }
    if (flag == 3) {
      console.log("here");
      App.contracts.DecentralizedShipment.deployed().then(function(instance) {
        return instance.register_shipment();
      }).catch(function(err) {
        console.log(err);
      });
    }
   
  },
  
  get_order_name: function(){
    var programList = document.getElementById("items");
    productName = programList.options[programList.selectedIndex].value;
    sessionStorage.setItem("productName", productName);
    console.log(productName);
  },



  /************  Customer Functions  ************/

  give_order : function(){
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.give_order([1],1);
    }).then(
      function(){
        console.log(sessionStorage.getItem("productName") + " Order Placed");
        
      }
    ).catch(function(err){
      console.log(err);
    });
  },
  check_order_status_customer : function(){

    console.log("Order Status");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){

      return  instance.check_order_status_customer(1,1);
    }).then(
      function(result){
        console.log(result[0].c[0]);
        console.log(result[1].c[0]);
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is not damaged");
        }else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is not damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is  damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is not damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is  damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is not damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is received and is not damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is received and is damaged");
        }else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is not damaged");
        }
        else if(result[0].c[0] == 5  && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is damaged");
        }
      }
    ).catch(function(err){
      console.log(err);
    });
  },


  cancel_order: function(){
    console.log("Order Cancelled");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.cancel_order(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  receive_order: function(){
    console.log("Order Received");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_order(1);
    }).catch(function(err){
      console.log(err);
    });
  },
  


 /**Seller Functions */
 receive_and_prepare_the_order: function(){
  console.log("Order Received and Prepared");
  App.contracts.DecentralizedShipment.deployed().then(function(instance){
    return instance.receive_and_prepare_the_order(1);
  }).catch(function(err){
    console.log(err);
  });
},

 transfer_order_to_shipment: function(){
   console.log("Order Transferred to Shipment");
   App.contracts.DecentralizedShipment.deployed().then(function(instance){
     return instance.transfer_order_to_shipment(1);
   }).catch(function(err){
        console.log(err);
      });
 },


  check_order_status_seller : function(){

    console.log("Order Status");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){

      return  instance.check_order_status_seller(1,1);
    }).then(
      function(result){
        console.log(result[0].c[0]);
        console.log(result[1].c[0]);
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is not damaged");
        }else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is not damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is  damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is not damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is  damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is not damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is received and is not damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is received and is damaged");
        }else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is not damaged");
        }
        else if(result[0].c[0] == 5  && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is damaged");
        }
          
      }
    ).catch(function(err){
      console.log(err);
    });
  },

  
  /**Shipment Functions */
  receive_and_ship_the_order: function(){
    console.log("Order Received and Shipped");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){
      return instance.receive_and_ship_the_order(1);
    }).catch(function(err){
      console.log(err);
    });
  },
  get_status: function(){
    var programList = document.getElementById("status");
    orderStatus = programList.options[programList.selectedIndex].value;
    console.log(orderStatus);
  },

  update_status : function(){
    var flag = 0;
    if (document.getElementById('damaged').checked) {
      flag =1;
   
    }
    if (document.getElementById('notDamaged').checked) {
      flag =2;
    
    }

    console.log("Order Status Updated");
    if(orderStatus == 1 && flag === 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
            instance.update_status_to_ofd_and_not_damaged(1);
      }).catch(function(err){
        console.log(err);
      });
    }
    if(orderStatus == 1 && flag === 1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        instance.update_status_to_ofd_and_damaged(1);
      }).catch(function(err){
      console.log(err);
      });
    }if(orderStatus == 2 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
            instance.update_status_to_received_and_not_damaged(1);
      }).catch(function(err){
        console.log(err);
      });
    }
    if(orderStatus == 2 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        instance.update_status_to_received_and_damaged(1);
      }).catch(function(err){
      console.log(err);
      });
    }if(orderStatus == 3 && flag == 2){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
            instance.update_status_to_cancelled_and_not_damaged(1);
      }).catch(function(err){
        console.log(err);
      });
    }
    if(orderStatus == 3 && flag ==1){
      App.contracts.DecentralizedShipment.deployed().then(function(instance){
        instance.update_status_to_cancelled_and_damaged(1);
      }).catch(function(err){
      console.log(err);
      });
    }
  },

  
 check_order_status_shipment : function(){

    console.log("Order Status");
    App.contracts.DecentralizedShipment.deployed().then(function(instance){

      return  instance.check_order_status_shipment(1,1);
    }).then( 
      function(result){
        
        if(result[0].c[0] == 0 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is not damaged");
        }else if(result[0].c[0] == 0 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ordered and is damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is not damaged");
        }
        else if(result[0].c[0] == 1 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is preparing and is  damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is not damaged");
        }
        else if(result[0].c[0] == 2 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is ontheway and is  damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is not damaged");
        }
        else if(result[0].c[0] == 3 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is outfordelivery and is damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is received and is not damaged");
        }
        else if(result[0].c[0] == 4 && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is received and is damaged");
        }else if(result[0].c[0] == 5 && result[1].c[0] == 1){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is not damaged");
        }
        else if(result[0].c[0] == 5  && result[1].c[0] == 0){
          console.log(sessionStorage.getItem("productName") + " order is cancelled and is damaged");
        }
      }).catch(function(err){
      console.log(err);
    });
  },


  
  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
