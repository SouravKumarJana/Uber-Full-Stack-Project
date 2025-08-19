import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from '../../context/captainContext';
import { useContext } from 'react';

const CaptainLogin = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {captain , setCaptain} = useContext(CaptainDataContext)

    const submitHandler = async (e)=>{
        e.preventDefault();

        const captainData = {
            email:email,
            password:password
        };
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

            if( response.status == 200){

                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                //localStorage.setItem('captain', JSON.stringify(data.captain))
                navigate('/captain-home')
            }
        }catch (error) {
                console.error('Login failed:', error.response?.data || error.message);
                alert('Login failed. Please check your inputs or try again later');
        }
        setEmail('')
        setPassword('')
    }

//     useEffect(() => {
//   console.log("Captain state updated:", captain);
// }, [captain]);

    return(

        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className='w-24 mb-6 ml-4' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="UberLogo" />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                    <h3 className="text-xl font-medium mb-3">What's Your Email</h3>

                    <input 
                        required
                        type="email"
                        className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base" 
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
                        className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    ></input>

                    <button className="bg-[#0b0b0b] mb-3 rounded px-4 py-2 w-full text-white text-lg font-semibold">Login As Captain</button>

                </form>
                    
                <p className="mb-7 text-center text-[#0b0b0b]">New Here? <Link to= '/captain-signup' className="text-blue-600">Register As Captain</Link></p>

            </div>

            <div>
                <Link to='/user-login' className="bg-[#dd8035] flex items-center justify-center mb-7 rounded px-4 py-2 w-full text-white text-lg font-semibold">Sign in As User</Link>
            </div>

        </div>
    )
}


export default CaptainLogin