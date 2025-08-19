import React from "react";

const WaitingForDriver = (props)=>{
    
    return(
       <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setWaitingForDriver(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-6 mt-5 '>Waiting For A Driver..</h3>
            <div className="flex items-center justify-between mb-4 px-3 py-1.5">
                <img className="h-24 ml-2 rounded-full" src="https://www.svgrepo.com/show/408291/car-white.svg" alt="" />
                <div className="text-right">
                    <h2 className="text-lg font-medium capitalize">Captain : {props.ride?.captain.fullname.firstname +" "+(props.ride?.captain?.fullname?.lastname??' ')}</h2>
                    <h4 className="text-lg font-semibold -mt-1 -mb-1">{props.ride?.captain?.vehicle.plate}</h4>
                    <p className="text-sm text-gray-800">{props.ride?.captain.vehicle.model}</p>
                    <h1 className="text-lg font-semibold -mt-1">Otp: {props.ride?.otp}</h1>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center " >

                <div className="w-full mt-3 ">
                    <div className="flex items-center  shadow-md rounded-lg p-3 -mt-3 mb-2">
                        <i className=" text-2xl ri-map-pin-user-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.ride?.pickUp.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.ride?.pickUp}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-2">
                        <i className="text-2xl ri-map-pin-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.ride?.destination.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-2">
                        <i className=" text-2xl ri-money-rupee-circle-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                        </div>
                    </div>
                </div>
            </div>

        </div> 
    )
}

export default WaitingForDriver