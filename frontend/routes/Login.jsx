
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../components/loginValidation'
import {LogIn} from "../fetchData";
import useVerifyAuthentication from '../hooks/verifyJWTHook';

export default function Login() {
    const navigate = useNavigate();
    const {isAuthenticated} = useVerifyAuthentication()
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);

    const {getData, data, error, loading} = LogIn();
    

    const [values, setValues] = useState({
        email:'',
        password:'',
    })
    const [errors, setErrors] = useState('');

    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }
    const handleSumbit = (event) =>{
        event.preventDefault();
        setErrors(validation(values));
    }
    useEffect(()=>{
        if(errors.mail === "")
            getData(values);
      },[errors])
    useEffect(()=>{
        if(data && data.Login)
        {
            localStorage.setItem("token", data.token);
            navigate('/home');
        }
    },[data])
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSumbit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleInput}
                            name='email'
                        />
                        {errors.email && <span className='text-red-600'>{errors.email}</span>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleInput}
                            name='password'
                        />

                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password? {(data && data==='Fail') && <span className='text-red-600'>No accounts with that email and password</span> }
                    </a>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to={"/register"}
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}