"use client"
import React, { Dispatch, SetStateAction, useContext } from 'react';


import { getCurrentUser } from "@/components/services/Auth";
import { createContext, useEffect, useState } from "react";
import { IUser } from '@/types';

interface IUserProviderValues {
    user:IUser|null;
    isLoading:boolean;
    setUser:(user:IUser|null) =>void;
    setIsLoading:Dispatch<SetStateAction<boolean>>
}

const userContext = createContext<IUserProviderValues|undefined>(undefined)

  const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<IUser|null>(null)
const [isLoading,setIsLoading] = useState(true)
const handleUser = async()=>{
    const user = await getCurrentUser()
    setUser(user)
    setIsLoading(false)
}

useEffect(()=>{
    handleUser()
},[setIsLoading])
    return (
       <userContext.Provider value={{user,setUser,setIsLoading,isLoading}}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = ()=>{
    const context = useContext(userContext)

    if(context === undefined){
        throw new Error("User user must be used within UserProvider")
    }
    return context
}


export default UserProvider
