function Seller_Actions() {

    return (
        <div className="grid grid-cols-2 place-items-center mt-8 h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="grid grid-cols-1 place-items-center bg-yellow-300 p-4 mb-10 rounded">
                <form className="grid grid-cols-1 place-items-center">
                    <label className="font-bold mb-2 ">
                        <h1 className="font-bold mb-6 ">Ship an Order:</h1>
                        <input type="number" name="productID" placeholder="  Product ID" />
                    </label>
                    <br></br>
                    <input type="submit" value="Ship" className="bg-black text-white font-bold pt-1 pb-1 pr-4 pl-4 rounded-md"/>
                </form>
                <form className="grid grid-cols-1 gap-1 mt-8 place-items-center">
                    <label className="font-bold mb-2 mx-6">
                        <h1 className="font-bold mb-6 ">Check Status:</h1>
                        <input type="number" name="orderID" placeholder="  Order ID" />
                    </label>
                    <input type="submit" value="Check" className="mt-4 bg-black text-white font-bold py-1 px-4 rounded-md"/>
                </form>
            </div>
            <div className="bg-green-600 w-10/12 h-5/6 mr-20 ml-20 py-16 px-20 mb-14 rounded">
                <div className="w-full h-full">
                    <h2 className="font-bold my-2">
                        Order ID:
                    </h2>
                    <h2 className="font-semibold my-2">
                        874794651418213
                    </h2>
                    <h2 className="font-bold my-2 mt-6">
                        Status:
                    </h2>
                    <h2 className="font-semibold my-2">
                        On The Way
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Seller_Actions;