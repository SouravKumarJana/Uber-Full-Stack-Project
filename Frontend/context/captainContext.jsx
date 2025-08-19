import React , {useState, createContext} from 'react';

export const  CaptainDataContext = createContext() 

const CaptainContext = ({children}) =>{

    const [captain, setCaptain] = useState({
        fullname:{
                firstname:'',
                lastname:''
        },
        email:'',
        password:'',
        vehicle:{
            color:'',
            plate:'',
            capacity:'',
            vehicleType:'',
            model:''
        }
    })
    //  const [captain, setCaptain] = useState(null);
    //  const [isLoading, setIsLoading] = useState(false);
    //  const [error, setError] = useState(null);

    
    // const value = {
    //     captain,
    //     setCaptain,
    //     isLoading,
    //     setIsLoading,
    //     error,
    //     setError
    // }

    return(
        <CaptainDataContext.Provider value={{captain, setCaptain}}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext