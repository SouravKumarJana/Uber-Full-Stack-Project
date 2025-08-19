import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogout = ()=>{

    const navigate = useNavigate()
    
    useEffect(() =>{

        const token = localStorage.getItem('token')

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then((response) =>{
            if(response.status == 200){
                localStorage.removeItem('token')
                //localStorage.removeItem('captain')
                navigate('/captain-login')
            }
        }).catch((error)=>{
            console.error('Logout Failed', error)
            //alert('Logout Failed')
        })
    })

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout