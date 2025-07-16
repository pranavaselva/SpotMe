import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {

    const [UserName, setUserName] = useState("");  
    const [Age,setAge] = useState("");  
    const [Email,setEmail] = useState("");  
    const [Password,setPassword] = useState("");  
    const navigate = useNavigate();

    const validatePassword = (password) =>{
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordPattern.test(password);
    }

    return (
        <div className="relative flex items-center justify-center h-screen w-screen bg-[#0b0f19] overflow-hidden text-white">
          {/* Radar animation */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="radar">
              <div className="radar-circle" />
              <div className="radar-circle" />
              <div className="radar-circle" />
              <div className="radar-sweep" />
            </div>
          </div>
      
          {/* Extra ambient tracking elements (side dots and lines) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Dots */}
            <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <div className="absolute bottom-[20%] right-[12%] w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
            <div className="absolute bottom-[10%] left-[25%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
      
            {/* Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="10" y1="0" x2="90" y2="100" stroke="white" strokeWidth="0.2" />
              <line x1="90" y1="0" x2="10" y2="100" stroke="white" strokeWidth="0.2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" />
            </svg>
          </div>
      
          {/* Signup Form Card */}
          <div className="z-10 backdrop-blur-md bg-white/10 p-8 rounded-2xl w-[90%] max-w-md shadow-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center">📝 Create Your Account</h2>
            <form className="flex flex-col space-y-4">
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={UserName}
                className="bg-white/10 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <inputz
                id="age"
                type="number"
                placeholder="Age"
                required
                value={Age}
                className="bg-white/10 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={Email}
                className="bg-white/10 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={Password}
                className="bg-white/10 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold p-3 rounded-lg"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-300">
              Already have an account?{" "}
              <span onClick={() =>navigate("/")} className="text-blue-400 underline cursor-pointer">Login</span>
            </p>
          </div>
        </div>
      );
      
}

export default Signup;