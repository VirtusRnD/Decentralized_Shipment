<img src="Project Proposal Presentation/decentralized shipment.png" alt="Logo" width="300" height="200">


# Decentralized Shipment

This project is based on handling common shipment problems that we all probably have experienced before by using a decentralized solution. 

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#decentralized-shipment">Decentralized Shipment</a></li>
    <li><a href="#project-description">Project Description</a></li>
    <li><a href="#team-members">Team Members</a></li>
    <li><a href="#system-design">System Design</a></li>
    <li><a href="#system-usage">System Usage</a></li>
    <li><a href="#mobile-application-ui">Mobile Application UI</a></li>
    <li><a href="#requirements">Requirements</a></li>
  </ol>
</details>


## Project Description

<p>
    Even in today's world, unfortunately most of us have experienced shipment problems too many times and we probably will be experiencing these problems even more. For example:
</p>
<p>
    After we order a product, we usually suffer from receiving our order damaged or incomplete. Sometimes we do not even receive our order at all. But we are still treated as if we have received our order perfectly.
</p>
<p>
    Also in case of order cancel, everyone in the system (seller, shipping company employees, customer) wait for the cancelling process to be confirmed, which takes too much time. This waiting process means wasting time and not being able to use the cost of order for a few days (which might be critical).
</p>
<p>
    We want to eliminate these kind of problems by using blockchain technology.
</p>

## Team Members

<table>
  <tr>
    <td align="center"><a href="https://github.com/hasanaliozkan-dev"><img src="https://avatars.githubusercontent.com/u/63359311?v=4" width="100px;" alt=""/><br /><sub><b>Hasan Ali ÖZKAN</b></sub></a><br /><br /><sub><b>Smart Contract Developer</b></sub></a><br /></a></td>
    <td align="center"><a href="https://github.com/mehmetkadri"><img src="https://avatars.githubusercontent.com/u/58008233?s=400&v=4" width="100px;" alt=""/><br /><sub><b>Mehmet Kadri GOFRALILAR</b></sub></a><br /><br /><sub><b>Mobile Application Developer</b></sub></a><br /></a></td>
  </tr>
</table>


## System Design

As seen in below figure, 
<!--Will be added later-->

<div align="center">
  <img src="Project Proposal Presentation/1.blockchain_schema_final.png" alt="Model" width="700">
</div>


## System Usage

<pre>
  After you order a product from online websites, there are four possible problems that you might suffer from during the shipment 
process. These four possible problems are:
    
      a. You receive your order too late,
      b. You receive your order damaged,
      c. You don’t receive your order because it is lost,
      d. You receive your money back days after in case of order canceling.

  Even if these scenarios don’t trouble the seller, due to the instability of inflation in today’s world, especially in Turkey, 
customers are suffering. We thought of this idea to speed up the processes, make sure that the order is received by the customer 
in one piece and if not, find the guilty party faster and clearer.
    
  The process will be like following:

      1. Customer orders the product(s).
      2. Shopping website confirms the transaction.
      3. Order information, seller information and customer information are written to shared database.
      4. Order status is updated as “preparing” in the shared database.
      5. Seller prepares the order and gives the order to shipping company.
      6. Shipping company writes the information of the assigned shipping company employee to shared database.
      7. Shipping company employee writes the order information as “intact” or “damaged” to shared database when he/she receives 
      the order from seller.
      8. Order status is updated as “on the way” in the shared database.
      9. After the order arrives to the shipping company’s delivery department, information of the employee who is responsible 
      of delivery is written to the shared database.
      10. The employee who is responsible of delivery writes the order information as “intact” or “damaged” to shared database 
      when he/she receives the order from company’s delivery department.
      11. Order status is updated as “delivery” in the shared database.
      12. Order status is updated as “received by the customer” in the shared database after customer safely receives the order.
      
  In case of canceling: (Until the order is received by the customer)
  
      1. Customer cancels the order.
      2. Shopping website updates the order status as “canceled” in the shared database.
      3. Shipping company confirms that the order is not received by the customer yet.
      4. Shopping website pays the customer’s money back and order is canceled.

</pre>



## Mobile Application UI

<!--Will be added later-->

# Requirements

*
*
<!--Will be added later-->
