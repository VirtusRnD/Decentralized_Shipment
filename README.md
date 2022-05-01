<div id="top"></div>


[![Contributors][contributors-shield]][contributors-url]
[![Contributors][contributors-shield2]][contributors-url2]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="Project Proposal Presentation/decentralized shipment.png" alt="Logo" width="300" height="200">
  </a>

<h2 align="center">Decentralized Shipment</h2>

  <p align="center">
    This project is based on solving common shipment problems that we all probably have experienced before.
  </p>
  
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#project-model">Project Model</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


  <p>
    After we order a product, we usually suffer from receiving our order damaged or incomplete. Sometimes we do not even receive our order at all. But we are still treated as if we have received our order perfectly.
  </p>
  <p>
    Also in case of order cancel, everyone in the system (seller, shipping company employees, customer) wait for the cancelling process to be confirmed, which takes too much time. This waiting process means wasting time and not being able to use the cost of order for a few days (which might be critical).
  </p>

<p align="right">(<a href="#top">back to top</a>)</p>



### Technologies Used

* [linkedin](https://linkedin.com/)
* [youtube](https://youtube.com/)
* [google](https://google.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is what we will be doing. These will be the steps. We first will do this, and then we will do that.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MODEL -->
## Project Model
<div align="center">
  <img src="Project Proposal Presentation/1.blockchain_schema_final.png" alt="Model" width="700">
</div>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

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

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Step 1: 
- [ ] Step 2: 
- [ ] Step 3: 
    - [ ] Part 1: 
    - [ ] Part 2:

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/badge/Contributor-Mehmet%20Kadri%20GOFRALILAR-yellow
[contributors-url]: https://github.com/mehmetkadri
[contributors-shield2]: https://img.shields.io/badge/Contributor-Hasan%20Ali%20ÖZKAN-yellow
[contributors-url2]: https://github.com/hasanaliozkan-dev

[product-screenshot]: images/screenshot.png
