import React, { useState, useRef, useContext, useEffect } from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import ChooseVehiclePanel from '../components/ChooseVehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketDataContext } from '../../context/socketContext';
import { UserDataContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const UserHome = ()=>{

    const [pickUpLocation , setPickUpLocation] = useState('')
    const [destinationLocation, setDestinationLocation] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [chooseVehiclePanel, setChooseVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFinding, setVehicleFinding] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickUpSuggestions, setPickUpSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState(null)
    const [vehicleType, setVehicleType] = useState(null)
    const [confirmedRideInformation, setConfirmedRideInformation] = useState(null)

    const panelRef = useRef(null)
    const panelCloseArrowRef = useRef(null)
    const chooseVehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFindingRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const navigate = useNavigate()

    const {user} = useContext(UserDataContext);
    const {socket} = useContext(SocketDataContext);

    useEffect(()=>{
        socket.emit('join',{userId: user._id, userType: 'user'})
    },[user])


    socket.on('ride-confirmed', confirmRideInfo =>{

        setConfirmedRideInformation(confirmRideInfo)
        //console.log(confirmRideInfo)
        setVehicleFinding(false)
        setWaitingForDriver(true)
        
    })

    socket.on('start-ride', ride =>{
        setWaitingForDriver(false)
        navigate('/user-riding', {state: {ride}})
    })

    const handlePickUpChange = async (e)=>{
        setPickUpLocation(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
                params: {input: e.target.value },
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickUpSuggestions(response.data)
        } catch (error) {
            console.error('Failed to fetch pickUp suggestions:', error);
        }
    }


    const handleDestinationChange = async (e)=>{
        setDestinationLocation(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
                params:{input: e.target.value},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch (error) {
            console.error('Failed to fetch pickUp suggestions:', error);
        }
    }

    const submitHandler =(e)=>{
        e.preventDefault()
    }

     const findTrip = async ()=>{
        setChooseVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
            params:{
                pickUp:pickUpLocation,
                destination:destinationLocation
            },
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
        //console.log(response.data)
    }


    const createRide = async()=>{

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`,{
            pickUp:pickUpLocation,
            destination:destinationLocation,
            vehicleType
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        //console.log(response.data)
    }   



    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current,{
                height:'70%',
                padding:24
            })
            gsap.to(panelCloseArrowRef.current,{
                opacity:1
            })
        }
        else{
            gsap.to(panelRef.current,{
                height:'0%',
                padding:0
            })
            gsap.to(panelCloseArrowRef.current,{
                opacity:0
            })
        }
    },[panelOpen])

    useGSAP(function(){
        if(chooseVehiclePanel){
            gsap.to(chooseVehiclePanelRef.current,{
                transform: 'translateY(0)'  
            })
        }
        else{
            gsap.to(chooseVehiclePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[chooseVehiclePanel])

    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePanel])

    useGSAP(function(){
        if(vehicleFinding){
            gsap.to(vehicleFindingRef.current,{
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(vehicleFindingRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[vehicleFinding])

    useGSAP(function(){
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current,{
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(waitingForDriverRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[waitingForDriver])

    return(
        <div className='h-screen relative overflow-hidden'>
            <img className='w-19 absolute left-5 top-5' src="https://images.seeklogo.com/logo-png/33/2/uber-logo-png_seeklogo-338872.png" alt="UberLogo" />
            <div className='w-screen h-screen'>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Uber Map" /> */}
                <LiveTracking/>
            </div>
            <div className='flex flex-col h-screen absolute w-full top-0 justify-end'>
                <div className='bg-white h-[30%] w-full p-6 relative'>
                    <h5 ref={panelCloseArrowRef} 
                        className='text-2xl font-bold top-5 opacity-0 right-5 absolute'
                        onClick={()=>{
                            setPanelOpen(false)
                        }}
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find A Trip</h4>
                    <form onSubmit={(e)=>{
                        submitHandler(e);
                    }}>
                        <div className='line absolute top-2/5 left-12 h-16 w-1 bg-gray-800'></div>
                        <input  
                            type="text" 
                            placeholder='Add a pick-up location'
                            onClick={()=>{
                                setPanelOpen(true)
                                setActiveField('pickUp')
                            }}
                            className='bg-[#eeeeee] text-base px-12 py-2 rounded-lg w-full mt-5 '
                            value={pickUpLocation}
                            onChange={handlePickUpChange}
                        />
                        <input 
                            type="text" 
                            placeholder='Enter your destination' 
                            onClick={()=>{
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            className='bg-[#eeeeee] text-base px-12 py-2 rounded-lg w-full mt-4'
                            value={destinationLocation}
                            onChange={handleDestinationChange}
                        />
                    </form>
                    <button
                        onClick={findTrip} 
                        className='bg-black text-white text-lg w-full font-semibold p-3 rounded-xl mt-4'>Find Trip</button>
                </div>
                <div ref={panelRef} className='bg-white w-full h-0 '>
                    <LocationSearchPanel setChooseVehiclePanel={setChooseVehiclePanel} 
                                         suggestions={activeField === 'pickUp' ? pickUpSuggestions : destinationSuggestions}
                                         setPickUpLocation={setPickUpLocation}
                                         setDestinationLocation={setDestinationLocation}
                                         activeField={activeField}
                    />
                </div>
            </div>

            
            <div ref={chooseVehiclePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-5 translate-y-full pt-9'>
                <ChooseVehiclePanel setChooseVehiclePanel={setChooseVehiclePanel} 
                                    setConfirmRidePanel={setConfirmRidePanel}
                                    fare={fare}
                                    setVehicleType={setVehicleType}
                />
            </div>

            <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-9 translate-y-full pt-9'>
                <ConfirmRidePanel 
                    setConfirmRidePanel={setConfirmRidePanel} 
                    setVehicleFinding={setVehicleFinding}
                    createRide={createRide}
                    fare={fare}
                    pickUpLocation={pickUpLocation}
                    destinationLocation={destinationLocation}
                    vehicleType={vehicleType}
                />
            </div>

            <div ref={vehicleFindingRef} className='fixed z-10 bottom-0 bg-white w-full p-9 translate-y-full'>
                <LookingForDriver   setVehicleFinding={setVehicleFinding}
                                    fare={fare}
                                    pickUpLocation={pickUpLocation}
                                    destinationLocation={destinationLocation}
                                    vehicleType={vehicleType}
                />
            </div>

            <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 bg-white w-full p-9  '>
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver}
                                  ride={confirmedRideInformation}
                />
            </div>
        </div>
    )
}

export default UserHome