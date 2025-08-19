import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = ()=>{

    const navigate = useNavigate()
    
    useEffect(() =>{

        const token = localStorage.getItem('token')

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then((response) =>{
            if(response.status == 200){
                localStorage.removeItem('token')
                navigate('/user-login')
            }
        }).catch((error)=>{
            console.log('Logout Failed', error)
            //alert('Logout Failed')
        })
    },[navigate])

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout