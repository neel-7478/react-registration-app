import React, { useState } from 'react'
// import { Link, useHistory } from "react-router-dom"
import {useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    let history = useHistory();
    const handleSignup = () => {
        history.push("/");
    }
    const [credentials, setCredentials] = useState({ email: " ", password: " " });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            toast.success('Logged In Successfully!', {
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
    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <div className="container flex flex-col items-center bg-white h-[500px] w-[480px] mx-auto my-4">
                    <h1 className="text-3xl font-bold my-5">
                        Login
                    </h1>
                    <h3 className='text-black my-2'>Login to your previously registered account</h3>
                    <input name='email' id='email' className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' type="email" placeholder='Enter your email' autoComplete='off' onChange={onChange} required />
                    <input name='password' id='password' type="password" className='my-2 mx-3 py-2 px-5 text-lg text-black w-80 border font-bold border-gray-400 hover:outline-blue-300 rounded-sm ' placeholder='Enter your password' onChange={onChange} required />
                    <button value="submit" className=" my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log In</button>
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
                    <h4 className='text-center text-black'>Need an account?<button type='button'className='cursor-pointer hover:underline' onClick={handleSignup}>Sign Up</button></h4>
                </div>
            </form>
        </>
    )
}

export default Login
