import React from "react";
import { Link } from "react-router-dom";

const Start = () =>{
    return(
        <div className="bg-[url(https://door2doortaxi.com/wp-content/uploads/2022/06/taxi-app.png)] bg-contain bg-center bg-no-repeat h-screen w-full flex  justify-between flex-col bg-[#e8e8e8]">
            <img className='w-19 h- 19 ml-12 pt-10' src="https://images.seeklogo.com/logo-png/33/2/uber-logo-png_seeklogo-338872.png" alt="UberLogo" />
            <div className=' text-2xl font-bold px-10 py-10'>
                <h2>Get Started with Uber</h2>
                <Link to='/user-login' className="inline-block w-full bg-black text-white text-center py-3 rounded-xl mt-5">Continue</Link>
            </div>
        </div>
    )
}

export default Start