import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import {useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  let history = useHistory();
  const handleSignin = () => {
    history.push("/login")
  }
  const [credentials, setCredentials] = useState({ name: " ", email: " ", password: " ", confirmpassword: " " });
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/auth/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      // localStorage.setItem('token', json.authtoken);
      toast.success('Account Created Successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error('Invalid Credentials!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <div className="container flex flex-col items-center bg-white h-[500px] w-[480px] mx-auto my-4">
          <h1 className="text-3xl font-bold my-5">
            Register
          </h1>
          <h3 className='text-black my-2'>Create an account.It's free and only takes a minute</h3>
          <input name='name' id='name' className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' type="text" placeholder='Enter your name' onChange={onChange} autoComplete="off" required minLength={4} />
          <input name='email' id='email' className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' type="email" placeholder='Enter your email' autoComplete='off' onChange={onChange} required />
          <input name='password' id='password' type="password" className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' placeholder='Enter your password' onChange={onChange} required minLength={6} />
          <input name='confirmpassword' id='confirmpassword' type="password" className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' placeholder='Please confirm your password' onChange={onChange} required minLength={6} />
          <button value="submit" className=" my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Register Now</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h4 className='text-center text-black'>Already have an account?<button type='button' className='cursor-pointer hover:underline' onClick={handleSignin}>Log In</button></h4>
        </div>
      </form>
    </>
  )
}

export default Signup
