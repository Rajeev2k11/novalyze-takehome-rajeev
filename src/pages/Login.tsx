import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";



interface LoginFormData {
  email: string;
  password:string;
}

interface ResetFormData {
  email:string;
}

const dummyUsers = [
  { email: "test@example.com", password: "password123" },
  { email: "user@example.com", password: "userpass" },
];



const Login: React.FC = () => {

  const [loginForm, setLoginForm] = useState<LoginFormData>({email: "", password:""})
  const [resetForm, setResetForm] = useState<ResetFormData>({email: ""})
  const [showForgetPassword,setShowForgetPassword] = useState <boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("");


  const navigate = useNavigate();

  const handleLoginInput =useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setLoginForm(prev=> ({...prev,[name]:value}))
  },[])
  

  const handleCreateAccount =()=>{
    navigate("/signup")
  }
  const handleSSOLogin =(SSO:string)=>{
    console.log("Provider",SSO)
    navigate("/")
  }
  const handleChangePassword = ()=>{
    setShowForgetPassword(prev => !prev)
  }

  const handleResetChange =(e :React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setResetForm(prev=> ({...prev, [name]:value}))
  }

  const handleForgotPassword =(e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    // I can pass api here
    alert(`Password reset link sent to ${resetForm.email}`)
    setResetForm({email:""})
    setShowForgetPassword(false);

  }
  const handleLogin =(e :React.FormEvent)=>{
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.email === loginForm.email && u.password === loginForm.password
    );
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password");
    }
  }

  return (
    <>
    <Header />
    <div className="flex h-screen items-center justify-center bg-gray-background-dark">
      <div className="max-w-md rounded-xl bg-white p-6 shadow-lg">
        {!showForgetPassword ? (
          <>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Login to access your account</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form className="mt-6" noValidate onSubmit={(e)=>handleLogin(e)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" placeholder="Enter your email" value={loginForm.email} required aria-required="true" onChange={handleLoginInput}
                 className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input id="password" name="password" type="password" placeholder="Enter your Password" value={loginForm.password} required aria-required="true" onChange={handleLoginInput}
                 className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                </div>
                <button type="submit" className="w-full rounded-md bg-primary p-2 text-white hover:bg-purple-900">
                  Login
                </button>
                <div className="mt-4 flex justify-between">
                  <button onClick={handleChangePassword} type="button" className="text-sm px-2 text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                    Change password
                  </button>
                  <button onClick={handleCreateAccount} type="button" className="text-sm text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                    Create a new user
                  </button>
                </div>
            </form>
           
            <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={() => handleSSOLogin("Google")}
                  >
                    <FaGoogle />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={() => handleSSOLogin("Microsoft")}
                  >
                    <FaMicrosoft />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={() => handleSSOLogin("Apple")}
                  >
                    <FaApple />
                  </button>
                </div>
                </div>
          </>
        ):(
          <>
           <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
           <p className="mt-2 text-gray-600">Enter your email to receive a reset link</p>
           <form className="mt-6" onSubmit={handleForgotPassword} noValidate>
                <div className="mb-4">
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your email"
                    value={resetForm.email}
                    onChange={handleResetChange}
                    required
                    aria-required="true"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary p-2 text-white transition hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    
                  >
                    Send Link
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={handleChangePassword}
                    
                  >
                    Back to Login
                  </button>
                </div>
              </form>
          </>
        )

        }
      </div>
    </div>
    </>
  );
};

export default Login;
