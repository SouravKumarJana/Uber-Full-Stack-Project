import React, { useRef, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = ()=>{

    const location = useLocation();
    const {ride} = location.state;

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)

    useGSAP(function(){
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
                transform: 'translateY(0)'  
            })
        }
        else{
            gsap.to(finishRidePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[finishRidePanel])

    return(
        <div className="h-screen">
            <div className='fixed top-0 p-5 flex items-center justify-between w-full'>
                <img className='w-19' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <Link to='/captain-logout' className="h-10 w-10 bg-white rounded-full flex items-center justify-center right-2 top-2">
                    <i className="text-lg font-semibold ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                {/* <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
                <LiveTracking/>
            </div>

            <div onClick={()=>{
                setFinishRidePanel(true)
            }} className="h-1/5  p-5 flex justify-between items-center bg-yellow-400 relative">
                <h5 className='absolute text-center w-[90%] top-0 p-2'><i className="text-3xl text-black ri-arrow-up-wide-fill"></i></h5>

                <h4 className="text-lg font-bold">4 KM away</h4>
                <button className="bg-green-600 text-white text-lg font-semibold rounded-lg px-10 py-3">Complte Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-5 translate-y-full pt-9'>
            <FinishRide setFinishRidePanel={setFinishRidePanel}
                        ride={ride}
            />
            </div>

            
        </div>
    )
}

export default CaptainRiding