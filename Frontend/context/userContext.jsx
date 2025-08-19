import React , {createContext, useState} from "react";

export const UserDataContext = createContext()    // create context

const UserContext = ({children})=>{       // UserContext is use for centralize the data  /* UserDataContext.Provider it provede the data where the data is needed */
    
    const [user, setUser] = useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:''
    })
    return(
                                                 
            <UserDataContext.Provider value={{user, setUser}}>     
                {children}                              
            </UserDataContext.Provider>
        
    )
}

export default UserContext