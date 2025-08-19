import React, { useEffect , useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../../context/captainContext';
import axios from 'axios';


const CaptainProtectWrapper = ({children})=>{

    const navigate = useNavigate()
    const [isAuthLoading, setIsAuthLoading] = useState(true)
    const {captain, setCaptain} = useContext(CaptainDataContext)

    const token = localStorage.getItem('token')

    useEffect(()=>{

        if(!token){
            navigate('/captain-login')
            return ;
        }

        // the token that present at localstorage is may be the user token or be the expiary-captain token 
        // or may be the captain-token, so it need to verify the token present at local storage is captain token or not 

        const verifyCaptain = async ()=>{
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.status == 200){
                    setCaptain(response.data)
                    setIsAuthLoading(false)
                }

            } catch (error) {
                console.error('Captain Auth Failed :',error);
                navigate('/captain-login')
            
            }
        };

        verifyCaptain();

    },[token, navigate, setCaptain])

    if(isAuthLoading){      // if response.status != 200
        return(
            <div>CaptainAuthLoading...</div>
        )
    }
    
    return(
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper