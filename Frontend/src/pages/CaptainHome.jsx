import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { CaptainDataContext } from '../../context/captainContext';
import { SocketDataContext } from '../../context/socketContext';
import axios from 'axios'
import LiveTracking from '../components/LiveTracking';

const CaptainHome = ()=>{

    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
    const [rideInfo, setRideInfo] = useState(null)

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)

    const {captain} = useContext(CaptainDataContext);
    const {socket} = useContext(SocketDataContext)

    useEffect(()=>{
        socket.emit('join',{userId:captain._id, userType:'captain'})

        const updateLocation = () => {
            if (navigator.geolocation) {       // try to take the current location from browser
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', { 
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        updateLocation();
        const locationInterval = setInterval(updateLocation, 10000)
        
        // return () => {
        //     clearInterval(locationInterval);
        // };
    },[])

    socket.on('new-ride-available',(rideInformation)=>{
        setRideInfo(rideInformation);
        //console.log(rideInformation);
        setRidePopUpPanel(true)
    })

    async function confirmRide (){
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
            rideId:rideInfo._id
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)
    }    

 
    useGSAP(function(){
        if(ridePopUpPanel){
            gsap.to(ridePopUpPanelRef.current,{
                transform: 'translateY(0)'  
            })
        }
        else{
            gsap.to(ridePopUpPanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[ridePopUpPanel])

    useGSAP(function(){
        if(confirmRidePopUpPanel){
            gsap.to(confirmRidePopUpPanelRef.current,{
                transform: 'translateY(0)'  
            })
        }
        else{
            gsap.to(confirmRidePopUpPanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePopUpPanel])

    
    return(
        <div className="h-screen">
            <div className='fixed top-0 p-5 flex items-center justify-between w-full'>
                <img className='w-19' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <Link to='/captain-logout' className="h-10 w-10 bg-white rounded-full flex items-center justify-center right-2 top-2">
                    <i className="text-lg font-semibold ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                {/* <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
                <LiveTracking />
            </div>

            <div className="h-2/5  p-5">
                <CaptainDetails />
            </div>

            <div ref={ridePopUpPanelRef} className='fixed z-10 bottom-0 bg-white w-full p-5 translate-y-full pt-9'>
                <RidePopUp setRidePopUpPanel={setRidePopUpPanel} 
                            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                            rideInfo={rideInfo}
                            confirmRide={confirmRide}
                />
            </div>

            <div ref={confirmRidePopUpPanelRef} className='fixed z-10 bottom-0 bg-white w-full h-screen p-5 translate-y-full pt-9'>
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
                                  setRidePopUpPanel={setRidePopUpPanel}
                                  rideInfo={rideInfo}
                />
            </div>
        </div>
    )
}

export default CaptainHome