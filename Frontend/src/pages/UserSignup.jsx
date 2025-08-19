import React, { useState, useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import  {UserDataContext} from '../../context/userContext';

const UserSignup = ()=>{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    const {user, setUser} = React.useContext(UserDataContext)

    const submitHandler = async (e)=>{
        
        e.preventDefault();
        
        const newUser = {
            fullname:{
                firstname:firstName,
                lastname:lastName
            },
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)  // send the new created user data to backend through httpt res

        if(response.status == 201){

            const data = response.data   // this data comes from server

            setUser(data.user)           // set the data of new user (Here the "user" comes from Backend) at user-context that make the data globally accessable
            localStorage.setItem('token', data.token)   // at local storage we store the token, because : after register or login we reload the page , then all data are erase from userContext but if we do "localStorage.setItem('token',data.token)" , at localstorage the token wiil be stored
            navigate('/user-home')
        }
        
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return(
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-19 mb-6' src="https://images.seeklogo.com/logo-png/33/2/uber-logo-png_seeklogo-338872.png" alt="UberLogo" />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                    <h3 className='text-xl font-medium mb-3'>What's Your Name</h3>
                    <div className='mb-6 gap-3 flex'>
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
                        className="bg-[#eeeeee] mb-6 rounded border px-4 py-2 w-full text-lg placeholder:text-base" 
                        placeholder="userEmail@gmail.com"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        ></input>

                    <h3 className="text-xl font-medium mb-3">Enter Password</h3>

                    <input
                        required
                        type="password"
                        className="bg-[#eeeeee] mb-9 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    ></input>
                    
                    <button className="bg-[#22986b] mb-5 rounded px-4 py-2 w-full text-white text-lg font-semibold">Register As User</button>

                </form>

                <p className='mb-5 text-center text-[#0b0b0b]'> Already have an account <Link to='/user-login' className='text-blue-600'>Login</Link></p>

            </div>

            <p className='text-sm text-center leading-tight'>This site is protected by reCAPTCHA and the Google <span className='underline font-bold'>Privacy Policy</span> and <span className='underline font-bold'>Terms of Service</span> apply.</p>
        </div>
    )
}

export default UserSignup