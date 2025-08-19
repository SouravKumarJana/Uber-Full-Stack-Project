import React , {createContext, useEffect} from 'react'
import {io} from 'socket.io-client'

export const SocketDataContext = createContext();

const SocketContext = ({children}) =>{

    const socket = io(`${import.meta.env.VITE_BASE_URL}`)
    //console.log('lets know about socket',socket)
    useEffect(()=> {
        socket.on('connect', ()=>{
            console.log('connected to server')
        });

        socket.on('disconnect', ()=>{
            console.log('disconnected from server')
        })
    },[])

    return(
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    )

}

export default SocketContext;