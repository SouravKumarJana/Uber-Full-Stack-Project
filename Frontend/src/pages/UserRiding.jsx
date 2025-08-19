import {useContext} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {SocketDataContext} from '../../context/socketContext'
import LiveTracking from "../components/LiveTracking";

const UserRiding = ()=>{

    const location = useLocation();
    const {ride} = location.state;

    const {socket} = useContext(SocketDataContext);

    const navigate = useNavigate();

    socket.on('ride-end', ()=>{
        navigate('/user-home')
    })

    return(
        <div className="h-screen">
            
            <Link to='/user-home' className="fixed h-10 w-10 bg-white rounded-full flex items-center justify-center right-2 top-2">
                <i className="text-lg font-semibold ri-home-4-line"></i>
            </Link>
            <div className="h-screen">
                {/* <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
                <LiveTracking/>
            </div>

            <div className="h-5.8/10 mt-2 p-4">
                <div className="flex items-center justify-between pr-2 mb-4">
                    <img className="h-16 ml-2 rounded-full" src="https://www.svgrepo.com/show/408291/car-white.svg" alt="" />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">{`${ride?.captain.fullname.firstname} ${ride?.captain?.fullname?.lastname ?? ' '}`}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-800">{ride?.captain.vehicle.model}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-between items-center  " >

                    <div className="w-full ">
                        <div className="flex items-center  shadow-md rounded-lg p-2 -mt-3 mb-2">
                            <i className=" text-2xl ri-map-pin-user-line"></i>
                            <div className="flex flex-col ml-3" >
                                <h3 className="text-lg font-medium">{ride?.pickUp.split(',')[0]}</h3>
                                <p className="text-sm text-gray-600 -mt-1">{ride?.pickUp}</p>
                            </div>
                        </div>
                        <div className="flex items-center shadow-md rounded-lg p-2 mb-2">
                            <i className="text-2xl ri-map-pin-line"></i>
                            <div className="flex flex-col ml-3" >
                                <h3 className="text-lg font-medium">{ride?.destination.split(',')[0]}</h3>
                                <p className="text-sm text-gray-600 -mt-1">{ride?.destination}</p>
                            </div>
                        </div>
                        <div className="flex items-center shadow-md rounded-lg p-2 mb-2">
                            <i className=" text-2xl ri-money-rupee-circle-line"></i>
                            <div className="flex flex-col ml-3" >
                                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                                <p className="text-sm text-gray-600 -mt-1">Online/Offline</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full p-3 rounded-lg bg-green-600 text-white text-lg font-semibold mt-6">Make A Payment</button>
            </div>
        </div>
    )
}

export default UserRiding