import { useEffect, useState } from "react";
import { User } from "../hooks/verifyJWTHook";
import React from "react";
import validation from "../components/loginValidation";
import { Button, Typography } from "@material-tailwind/react";
import { editUserProfile, getAppointmentsAxios } from "../fetchData";
import { Error } from "../components/loginValidation";
import { useNavigate } from "react-router-dom";
import { LogIn } from "../fetchData";
const UserPage = ({
  user,
  isAuthenticated,
  refetch,
}: {
  user: User;
  isAuthenticated: boolean;
  refetch: () => void;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const { data, error, loading, editProfile } = editUserProfile();
  const { appointment, appointmentError, appointmentLoading } =
    getAppointmentsAxios(user.CustomerID, user.Role);
  const { getData: loginUser } = LogIn();
  const [changingUserProfile, setChangingUserProfile] = useState(true);
  const [tableHead, setTableHead] = useState([""]);
  const [values, setValues] = useState({
    email: user.EmailAddress,
    name: user.Name,
    contactNumber: user.ContactNumber,
    userRole: user.Role,
    customerID: user.CustomerID,
  });
  const [errors, setErrors] = useState<Error>();
  const [cancelAppointmentModal, showCancelAppointmentModal] = useState(false);
  const handleInput = (event: any) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  useEffect(() => {
    values.name = user.Name;
    values.email = user.EmailAddress;
    values.contactNumber = user.ContactNumber;
    values.userRole = user.Role;
    values.customerID = user.CustomerID;
  }, [user]);
  useEffect(() => {
    if (
      values.email != user.EmailAddress ||
      values.name != user.Name ||
      values.contactNumber != user.ContactNumber
    )
      setChangingUserProfile(false);
    else setChangingUserProfile(true);
  }, [values]);
  const handleSumbit = (event: any) => {
    event.preventDefault();
    setErrors(validation(values));
    console.log("Submitujem");
  };
  const handleCancelAppointment = (event: any) => {
    event.preventDefault();
    showCancelAppointmentModal(true);
  };
  useEffect(() => {
    console.log(errors);
    if (errors?.email == "" && errors.name == "" && errors.password == "")
      editProfile(values);
  }, [errors]);
  console.log(data);
  useEffect(() => {
    if (data === "successful") {
      const userData = user;
      console.log(userData);
      localStorage.removeItem("token");
      loginUser({ email: userData.EmailAddress, password: userData.Password });
    }
  }, [data]);
  useEffect(() => {
    if (appointment) setTableHead(Object.keys(appointment[0]));
  }, [appointment]);
  console.log(appointment);
  return (
    <div className="w-2/3 flex flex-col justify-center mx-auto">
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
            value={values.name}
          />
          {/* {errors.name && <span className="text-red-600">{errors.name}</span>} */}
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
            value={values.contactNumber}
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
            value={values.email}
          />
          {errors?.email && (
            <span className="text-red-600">{errors.email}</span>
          )}
          {data === "AlreadyRegisteredEmail" && (
            <span className="text-red-600">
              An account with this email already exists!
            </span>
          )}
        </div>
        <Button className="mb-2">Change password?</Button>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600 disabled:bg-gray-800 disabled:opacity-70"
            disabled={changingUserProfile}
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
      {appointment && (
        <table className="mt-10 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointment?.map((appointment: any, index: number) => {
              const isLast = index === appointment.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appointment.Name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appointment.Date.slice(0, 10)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appointment.Time}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appointment.BarberName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button onClick={handleCancelAppointment}>Cancel</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default UserPage;
