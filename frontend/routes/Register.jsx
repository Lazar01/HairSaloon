import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {SignUp} from "../fetchData";
import validation from '../components/loginValidation'
export default function Register() {
    const navigate = useNavigate();
    const {getData, data, error, loading} = SignUp();
    const [values, setValues] = useState({
        email:'',
        password:'',
        name:'',
        contactNumber:'',
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
      if(errors.mail === "" && errors.name == "" && errors.password == "")
        {
          console.log(values.email);
          console.log(errors);
          getData(values);
        }
    },[errors])
    useEffect(()=>{
        if(data==="successful")
            navigate('/home')
    },[data])
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Create an account
          </h1>
          <form className="mt-6" onSubmit={handleSumbit}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleInput}
                name="name"
              />
              {errors.name && <span className='text-red-600'>{errors.name}</span>}
            </div>
            <div className="mb-2">
              <label
                htmlFor="contact"
                className="block text-sm font-semibold text-gray-800"
              >
                Contact Number
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="contactNumber"
                onChange={handleInput}
              />
            </div>
            <div className="mb-2">
              <label
                id="name"
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                onChange={handleInput}
              />
              {errors.email && <span className='text-red-600'>{errors.email}</span>}
              {data === "AlreadyRegisteredEmail" && <span className="text-red-600">An account with this email already exists!</span> }
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleInput}
                name="password"
              />
              {errors.password && <span className='text-red-600'>{errors.password}</span>}
            </div>
            <p className="text-xs text-gray-800 font-bold">
              Password must be at least 8 characters long
            </p>
            <div className="mt-6">
              <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                Sign up
              </button>
            </div>
          </form>
  
          <p className="mt-2 text-xs text-center text-gray-700">
            {" "}
            Already a member?{" "}
            <Link to={"/"} className="font-medium text-gray-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }