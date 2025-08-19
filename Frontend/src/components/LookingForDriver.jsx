import React from "react";


const LookingForDriver = (props)=>{
    return(
        <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setVehicleFinding(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-6 mt-5 '>Looking For A Driver..</h3>

            <div className="flex flex-col justify-between items-center  " >
                <img className="h-26" src="https://www.svgrepo.com/show/408291/car-white.svg" alt="" />

                <div className="w-full ">
                    <div className="flex items-center  shadow-md rounded-lg p-3 -mt-3 mb-2">
                        <i className=" text-2xl ri-map-pin-user-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.pickUpLocation?.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.pickUpLocation}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-2">
                        <i className="text-2xl ri-map-pin-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">{props.destinationLocation?.split(',')[0]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.destinationLocation}</p>
                        </div>
                    </div>
                    <div className="flex items-center shadow-md rounded-lg p-3 mb-2">
                        <i className=" text-2xl ri-money-rupee-circle-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">₹{props.fare ? props.fare[props.vehicleType] : '..'}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default LookingForDriver
