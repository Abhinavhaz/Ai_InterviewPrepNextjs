import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({children}) =>{
const {user} = useContext(UserContext);


return (
 <div className="w-full min-h-screen bg-white pt-6 px-6">

        <Navbar />
        {user && <div >{children}</div>}
</div>
)

}




export default DashboardLayout;














