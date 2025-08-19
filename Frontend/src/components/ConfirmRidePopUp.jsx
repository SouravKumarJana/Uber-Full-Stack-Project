import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props)=>{

    const navigate = useNavigate()

    const [otp, setOtp] =useState('')

    const submitHandler = async (e)=>{
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            params:{
                rideId: props.rideInfo._id,
                otp: otp
            },
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })

        if(response.status === 200){
            const rideData = response.data
            props.setConfirmRidePopUpPanel(false)
            navigate('/captain-riding',{state: {ride: rideData}})
        }
    }

    return(
        <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setConfirmRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-12 mt-3 '>Confirm This Ride</h3>
            
            <div className="flex items-center justify-between mb-3 p-4 border-yellow-300 border-2 rounded-lg">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                    <h2 className="text-lg font-medium ">{props.rideInfo?.user.fullname.firstname +" "+ props.rideInfo?.user.fullname.lastname}</h2>
                </div>
                <h5 className="text-lg font-semibold">{props.rideInfo?.distance} KM</h5>
            </div>

            <div className="flex flex-col justify-between items-center  " >
                
                <div className="w-full mt-3">
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
                    <div className="flex items-center shadow-md rounded-lg p-3">
                        <i className=" text-2xl ri-money-rupee-circle-line"></i>
                        <div className="flex flex-col ml-3" >
                            <h3 className="text-lg font-medium">₹{props.rideInfo?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 w-full">
                    <form onSubmit={submitHandler}>
                        <input 
                            value={otp}
                            onChange={(e)=>{
                                setOtp(e.target.value)
                            }}
                            required
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full bg-[#eeeeee] font-mono text-lg px-6 py-4 rounded-lg "
                        />

                        <button className="block w-full bg-green-700 p-3 text-white text-center font-semibold text-xl rounded-lg mt-6">Confirm</button>
                        
                    </form>

                </div>

                <button onClick={()=>{
                    props.setConfirmRidePopUpPanel(false)
                    props.setRidePopUpPanel(false)
                }} className=" w-full bg-orange-600 p-3 text-white font-semibold text-xl rounded-lg mt-2">Cancel</button>
            </div>

        </div>
    )
}

export default ConfirmRidePopUp