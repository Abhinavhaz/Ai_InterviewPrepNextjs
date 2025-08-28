import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Inputs";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPath";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {   
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Invalid email");
      return;
    }
    if(!password){
      setError("Invalid password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, { email, password });
      const { token } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response?.data?.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[50vw] p-8 flex flex-col justify-center mx-auto mt-10  ">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
      <p className="text-sm text-gray-500 mb-6">
        Login to your account
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Login
        </button>

        <p className="text-sm text-gray-500 mt-2 text-center">
          Don't have an account?{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
