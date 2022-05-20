import { AiFillPlayCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const Shipment_Employee_Wallet = () => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            
            document.getElementById("accountInfo").innerHTML=accounts[0].slice(0,5)+"..."+accounts[0].slice(accounts[0].length - 4);
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
    };
    

    return(

    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex w-full justify-center items-center">

        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white rounded-full border-2 border-white flex justify-center items-center">
                        <img src="../../src/ethereum-logo.png"/>
                    </div>
                </div>
                <div>
                <p id="accountInfo" className="text-white font-semibold text-sm">
                        Check if the correct account is selected!
                    </p>
                    <p className="text-white font-bold text-lg mt-1">
                        Shipment Company Employee
                    </p>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-start justify-start py-12 px-4">
            <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-purple-600">
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                    Connect Wallet
                </p>
            </button>
        </div>
    </div>
);}

export default Shipment_Employee_Wallet;