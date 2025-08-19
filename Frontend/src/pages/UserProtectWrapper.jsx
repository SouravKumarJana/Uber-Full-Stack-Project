//We want : if the user is successfully login or signup then only it navigate at <Home/> route
// For this we try to Do : we wrap <Home/> by UserProtectWrapper using "<UserProtectWrapper> <Home/> </UserProtectWrapper>"
import React,{useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/userContext';
import axios from 'axios';

const UserProtectWrapper = ({children}) =>{

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserDataContext);
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const token = localStorage.getItem('token');

    useEffect(() =>{
        if(!token){
        navigate('/user-login')
        return;
        }
        
        const verifyUser = async () =>{

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
                    headers:{
                        Authorization: `Bearer ${token}`         
                    }
                })

                if(response.status == 200){
                    setUser(response.data)
                    setIsAuthLoading(false)
                }
            } catch (error) {
                console.log('User Auth Failed :',error)
                navigate('/user-login')
            }
        };
        verifyUser();

    },[token, navigate, setUser])

    if(isAuthLoading){
        return(
            <div>AuthLoading...</div>
        )
    }
    return(
            <>
                {children}
            </>
        )

}

export default UserProtectWrapper