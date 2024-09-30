import React, { createContext, useContext } from "react";


interface UserContextType {
    data: {};
    setData: React.Dispatch<React.SetStateAction<{}>>;
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
