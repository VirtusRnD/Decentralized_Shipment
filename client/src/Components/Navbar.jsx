import React from "react";
import { useHistory } from "react-router-dom";

function goToPage(page, history){
    history.push(page);
    window.location.reload()
}

const Navbar = () => {
    let history = useHistory();
    return(
        <nav className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div style={{display:'flex'}}>
                <h1 className="font-bold ml-20 mt-7 mb-7 text-xl text-white cursor-pointer" onClick={ () =>  goToPage('/', history)} > Decentralized Shipment Management </h1>
                <button type="button" className=" font-bold ml-36 w-56 text-white flex flex-row justify-center items-center my-5 bg-red-600 p-3 rounded-full cursor-pointer hover:bg-orange-400" onClick={ () =>  goToPage('/customer_page', history)} > Customer </button>
                <button type="button" className=" font-bold ml-24 w-56 text-white flex flex-row justify-center items-center my-5 bg-yellow-300 p-3 rounded-full cursor-pointer hover:bg-green-600" onClick={ () =>  goToPage('/seller_page', history)} > Seller </button>
                <button type="button" className=" font-bold ml-24 w-56 text-white flex flex-row justify-center items-center my-5 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-purple-600" onClick={ () =>  goToPage('/shipment_employee_page', history)}> Shipment Employee</button>
            </div>
        </nav>
    );
}

export default Navbar;