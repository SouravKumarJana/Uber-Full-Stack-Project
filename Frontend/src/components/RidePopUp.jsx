import React from "react";

const   RidePopUp = (props)=>{
    return(
        <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-5 mt-3 '>New Ride Available Now!</h3>
            
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                    <h2 className="text-lg font-medium">{props.rideInfo?.user.fullname.firstname +" "+ props.rideInfo?.user.fullname.lastname}</h2>
                </div>
                <h5 className="text-lg font-semibold">{props.rideInfo?.distance}KM</h5>
            </div>

            <div className="flex flex-col justify-between items-center  " >
                
                <div className="w-full mt-5">
                    <div className="flex items-center  shadow-md rounded-lg p-3 -mt-3 mb-2">
                        <i className=" text-2xl ri-map-pin-user-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.rideInfo?.pickUp.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.rideInfo?.pickUp}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-2">
                        <i className="text-2xl ri-map-pin-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.rideInfo?.destination.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.rideInfo?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-7">
                        <i className=" text-2xl ri-money-rupee-circle-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">₹{props.rideInfo?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <button onClick={()=>{
                            props.setConfirmRidePopUpPanel(true)
                            props.confirmRide()
                        }} className=" bg-green-700 px-10 py-2.5 text-white font-semibold text-xl rounded-lg ">Accept</button>

                    <button onClick={()=>{
                        props.setRidePopUpPanel(false)
                        }} className=" bg-gray-400 px-10 py-2.5 text-white font-semibold text-xl rounded-lg">Ignore</button>
                </div>
            </div>

        </div>
    )
}

export default RidePopUp