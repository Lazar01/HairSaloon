import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../components/loginValidation";
import { LogIn } from "../fetchData";

interface LoginProps {
  isAuthenticated: boolean;
  refetch: any;
}

interface Error {
  email: string | null;
  password: string | null;
}

const Login: React.FC<LoginProps> = ({ isAuthenticated, refetch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const { getData, data, error, cancel } = LogIn();

  console.log(error?.message);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Error>({
    email: null,
    password: null,
  });

  const handleInput = (event: any) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSumbit = (event: any) => {
    event.preventDefault();
    setErrors(validation(values));
  };
  useEffect(() => {
    if (errors.email === "") getData(values);
  }, [errors]);
  useEffect(() => {
    if (data && data.Login) {
      localStorage.setItem("token", data.token);
      refetch();
      navigate("/home");
    }
  }, [data]);
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
              name="email"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
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
              name="password"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password}</span>
            )}
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?{" "}
            {error &&
              error.message === "Request failed with status code 401" && (
                <span className="text-red-600">
                  No accounts with that email and password
                </span>
              )}
          </a>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
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
};
export default Login;
