import React, {useState, useContext} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from "../../context/captainContext"



const CaptainSignup = () =>{

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleModel, setVehicleModel] = useState('')

    const navigate = useNavigate()

    const {captain, setCaptain} = useContext(CaptainDataContext)

    const submitHandler = async (e)=>{
        e.preventDefault();
        const newCaptain = {
            fullname:{
                firstname:firstName,
                lastname:lastName
            },
            email:email,
            password:password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType:vehicleType,
                model:vehicleModel
            }
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

                if (response.status == 201) {
                    const data = response.data;
                    setCaptain(data.captain);
                    localStorage.setItem('token', data.token);
                    //localStorage.setItem('captain', JSON.stringify(data.captain))
                    navigate('/captain-home');
                }
            } catch (error) {
                console.error('Registration failed:', error.response?.data || error.message);
                alert('Registration failed. Please check your inputs or try again later');
            }

        //console.log(userData);
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
        setVehicleModel('')
    }
    
    return(
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-19 mb-1' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="UberLogo" />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                    <h3 className='text-xl font-medium mb-3'>What's your Name</h3>
                    <div className='mb-3 gap-3 flex'>
                        <input
                            required
                            type='text'
                            placeholder='First Name'
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={firstName} 
                            onChange={(e)=>{
                                setFirstName(e.target.value)
                            }}
                            
                        ></input>

                        <input
                            required
                            type='text'
                            placeholder='Last Name'
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={lastName}
                            onChange={(e)=>{
                                setLastName(e.target.value)
                            }}
                        ></input>
                    </div>

                    <h3 className="text-xl font-medium mb-3">What's Your Email</h3>

                    <input 
                        required
                        type="email"
                        className="bg-[#eeeeee] mb-3 rounded border px-4 py-2 w-full text-medium placeholder:text-base" 
                        placeholder="captainEmail@gmail.com"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        ></input>

                    <h3 className="text-xl font-medium mb-3">Enter Password</h3>

                    <input
                        required
                        type="password"
                        className="bg-[#eeeeee] mb-3 rounded border px-4 py-2 w-full text-medium placeholder:text-base"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    ></input>

                    <h3 className='text-xl font-medium mb-3'>Vehicle's Informations</h3>
                    <div className='mb-3 gap-3 flex'>
                        <input
                            required
                            type='text'
                            placeholder='Vehicle Color'
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={vehicleColor} 
                            onChange={(e)=>{
                                setVehicleColor(e.target.value)
                            }}
                            
                        ></input>

                        <input
                            required
                            type='text'
                            placeholder='Plate Number'
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={vehiclePlate}
                            onChange={(e)=>{
                                setVehiclePlate(e.target.value)
                            }}
                        ></input>
                    </div>
                    
                    <div className='mb-3 gap-3 flex'>
                        <input
                            required
                            type='number'
                            placeholder='Vehicle Capacity'
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={vehicleCapacity} 
                            onChange={(e)=>{
                                setVehicleCapacity(e.target.value)
                            }}
                            
                        ></input>

                        <select
                            required
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-medium placeholder:text-base"
                            value={vehicleType}
                            onChange={(e)=>{
                                setVehicleType(e.target.value)
                            }}
                        >
                            <option value="" disabled >Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>

                    <input
                        required
                        type="text"
                        className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-medium placeholder:text-base text-center"
                        placeholder="Vehicle Model Name"
                        value={vehicleModel}
                        onChange={(e)=>{
                            setVehicleModel(e.target.value)
                        }}
                    ></input>
                    <button className="bg-[#22986b] mb-5 rounded px-4 py-2 w-full text-white text-lg font-semibold">Register As Captain</button>

                </form>

                <p className='mb-5 text-center text-[#0b0b0b] text-medium'> Already have an account <Link to='/captain-login' className='text-blue-600 text-lg'>Login</Link></p>

            </div>

            <p className='text-sm text-center leading-tight'>This site is protected by reCAPTCHA and the Google <span className='underline font-bold'>Privacy Policy</span> and <span className='underline font-bold'>Terms of Service</span> apply.</p>
        </div>
    )
}

export default CaptainSignup

