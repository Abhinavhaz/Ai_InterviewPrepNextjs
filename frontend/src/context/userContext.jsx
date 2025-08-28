import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
if(user) return;

const accessToken = localStorage.getItem("token");
if(!accessToken){
    setLoading(false);
    return; 
}

const fetchUser = async () => {
    try{
        const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE)
        setUser(response.data);
       
    }catch(error){
        console.log("User not found",error);
        clearUser();
    }finally{
        setLoading(false);
    }
}

fetchUser();
},[])

const updateUser =(userData)=>{
    setUser(userData);
    localStorage.setItem("token",userData.token);
    setLoading(false);
}

const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
}

return(
    <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
        {children}
    </UserContext.Provider>
)


}
export default UserProvider;

// App is the children here.

// When React renders <UserProvider>, it replaces {children} with <App />.

// So effectively, React sees:

// <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
//     <App />
// </UserContext.Provider>


// Now any component inside <App /> can access the UserContext using useContext(UserContext).
//// so its like passing app to userProvider then again sending back to App with children with all belonging