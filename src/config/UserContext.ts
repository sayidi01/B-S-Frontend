import React, { createContext, useContext } from "react";

import { Admin } from "../components/Admins/ModalCreateAdmin";

interface UserContextType {
    data: {};
    setData: React.Dispatch<React.SetStateAction<{}>>;
    isConnected: boolean | null;
    setIsConnected: React.Dispatch<React.SetStateAction<boolean | null>> ;
    currentAdmin: Admin | null; 
    setCurrentAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  
}


const UserContext = createContext<UserContextType | null>(null);


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContext.Provider');
    }
    return context;
};

export default UserContext;
