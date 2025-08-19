import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/userContext";


const UserLogin = ()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const navigate = useNavigate();

    const {user, setUser} = React.useContext(UserDataContext);

    const submitHandler = async (e)=>{
        e.preventDefault();
        const userData = {
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if(response.status == 200){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/user-home')
        }
        setEmail('')
        setPassword('')
    }
    return(
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className='w-19 mb-6' src="https://images.seeklogo.com/logo-png/33/2/uber-logo-png_seeklogo-338872.png" alt="UberLogo" />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                    <h3 className="text-xl font-medium mb-3">What's Your Email</h3>

                    <input 
                        required
                        type="email"
                        className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base" 
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
                        className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    ></input>
                    
                    {/* <h3 className="text-xl font-medium mb-3">Enter Password</h3>
                    <div className="relative mb-3">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            className="bg-[#eeeeee] rounded border px-4 py-2 w-full text-medium placeholder:text-base"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                            <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? "🙈" : "👁️"}
                            </button>
                    </div> */}


                    <button className="bg-[#0b0b0b] mb-3 rounded px-4 py-2 w-full text-white text-lg font-semibold">Login As User</button>

                </form>
                    
                <p className="mb-7 text-center text-[#0b0b0b]">New Here? <Link to= '/user-signup' className="text-blue-600">Create New Account</Link></p>

            </div>

            <div>
                <Link to='/captain-login' className="bg-[#33c289] flex items-center justify-center mb-7 rounded px-4 py-2 w-full text-white text-lg font-semibold">Sign in As Captain</Link>
            </div>
        </div>
    
    )
}

export default UserLogin