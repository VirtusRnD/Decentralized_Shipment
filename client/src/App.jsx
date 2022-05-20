import './App.css';

import Customer_Page from "./Pages/Customer_Page";
import Seller_Page from "./Pages/Seller_Page";
import Shipment_Employee_Page from "./Pages/Shipment_Employee_Page";

import Navbar from "./Components/Navbar";

import { BrowserRouter as Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/customer_page" component = {Customer_Page} />
            <Route exact path="/seller_page" component = {Seller_Page} />
            <Route exact path="/shipment_employee_page" component = {Shipment_Employee_Page} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
