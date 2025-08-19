import React, {useContext} from "react";
import {CaptainDataContext} from "../../context/captainContext"

const CaptainDetails = ()=>{

    //const captainString = localStorage.getItem('captain');
    //const captain = captainString ? JSON.parse(captainString) : null;
    // console.log(captain);
    // console.log(captain.fullname)
    const {captain} = useContext(CaptainDataContext);
    // console.log(captain)


    return(
        <div>
            <div className='flex justify-between items-center mt-4'>
                <div className='flex justify-between items-center gap-5'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid&w=740" alt="" />
                    <h4 className='text-lg font-medium'>{captain?.fullname?.firstname + " " + captain?.fullname?.lastname }</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹130.00</h4>
                    <p className='text-sm text-gray-700 -mt-0.5'>Earned</p>
                </div>
            </div>
            
            <div className='flex justify-center gap-5 mt-8 pt-6 pb-6 rounded-lg bg-gray-50'>
                <div className='text-center'>
                    <i className="text-2xl font-thin ri-history-line"></i>
                    <h5 className='text-lg font-medium'>10.5</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.5</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.5</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails