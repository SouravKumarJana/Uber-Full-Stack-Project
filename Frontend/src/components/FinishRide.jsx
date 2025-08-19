import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props)=>{

    const navigate = useNavigate();

    async function endRide (){

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
            { rideId: props.ride._id},
            { 
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        if(response.status === 200){
            props.setFinishRidePanel(false)
            navigate('/captain-home')
        }
    }
     
    return(
       <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-12 mt-3 '>Finish This Ride</h3>
            
            <div className="flex items-center justify-between mb-3 p-4 border-yellow-300 border-2 rounded-lg">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                    <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname +" "+(props.ride?.user?.fullname?.lastname)}</h2>
                </div>
                <h5 className="text-lg font-semibold">{props.ride?.distance}KM</h5>
            </div>

            <div className="flex flex-col justify-between items-center  " >
                
                <div className="w-full mt-3">
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
                    <div className="flex items-center shadow-md rounded-lg p-3">
                        <i className=" text-2xl ri-money-rupee-circle-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 w-full">
                    <button 
                        onClick={endRide}
                        className="block w-full bg-green-700 p-3 text-white text-center font-semibold text-xl rounded-lg mt-6">Finish Ride</button>
                </div>

            </div>

        </div>
    )
}

export default FinishRide