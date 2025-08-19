import React from "react";


const ChooseVehiclePanel = (props)=>{
    return (
        <div>
            <h5 className='absolute text-center w-[90%] top-0 p-2'onClick={()=>{
                props.setChooseVehiclePanel(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>

            <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehicleType('car')
                }} className='flex items-center w-full justify-between p-3 border-gray-200 active:border-black border-2 rounded-xl mb-3'>
                <img className='h-16 w-1/4' src="https://www.svgrepo.com/show/408291/car-white.svg" alt="UberCarLogo" />
                <div className='flex flex-col w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberGo <span className='font-semibold text-medium' ><i className="ri-user-3-fill"></i> 4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs'>Affordable, compact rides</p>
                </div>
                <h2 className='font-semibold text-xl'>₹{props.fare?.car??'..'}</h2>
            </div>

            <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehicleType('auto')
                }}className='flex items-center w-full justify-between p-3 border-gray-200 active:border-black border-2  rounded-xl mb-3'>
                <img className='h-12 w-1/4' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="UberCarLogo" />
                <div className='flex flex-col w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberAuto <span className='font-semibold text-medium' ><i className="ri-user-3-fill"></i> 3</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs'>Affordable, compact rides</p>
                </div>
                <h2 className='font-semibold text-xl'>₹{props.fare?.auto??'..'}</h2>
            </div>

            <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehicleType('motorcycle')
                }} className='flex items-center w-full justify-between p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
                <img className='h-18 w-1/4' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="UberCarLogo" />
                <div className='flex flex-col w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>Moto <span className='font-semibold text-medium' ><i className="ri-user-3-fill"></i> 1</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs'>Affordable motorcycle rides</p>
                </div>
                <h2 className='font-semibold text-xl'>₹{props.fare?.motorcycle??'..'}</h2>
            </div>
            
        </div>
    )
}

export default ChooseVehiclePanel