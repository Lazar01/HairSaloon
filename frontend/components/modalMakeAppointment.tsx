import React, { useState, useEffect, FormEvent } from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { getAllEmployees, makeAppointment } from "../fetchData";
import { IoClose } from "react-icons/io5";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
interface ModalProps {
  showModal: boolean;
  toggleModal: (showModal: boolean) => void;
  userID: number;
}

interface Employee {
  EmployeeID: number;
  Name: string;
  Addres: string;
  Image?: string;
  Schedule: string;
}

const Modal: React.FC<ModalProps> = ({ showModal, toggleModal, userID }) => {
  const [date, setDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(format(date, "yyyy-MM-dd"));
  const [chosenTime, setChosenTime] = useState("");
  const [chosenEmployee, setChosenEmployee] = useState(0);
  //AXIOS CALLS//
  const {
    data: AllEmployeesData,
    loading: EmployeesLoadin,
    error: AllEmployeesError,
  } = getAllEmployees();

  const {
    data: makeAppointmentResponse,
    error: makeAppointmentError,
    loading: makeAppointmentLoading,
    makeNewAppointment,
  } = makeAppointment();

  //Error handling when making appointment//

  useEffect(() => {
    if (
      makeAppointmentError &&
      // @ts-ignore
      makeAppointmentError.response.data == "NotAuthenticated"
    ) {
      const navigate = useNavigate();
      navigate("/");
    } else if (
      makeAppointmentError &&
      // @ts-ignore
      makeAppointmentError.response.data == "RejectedDate"
    ) {
      alert("Can't choose date in past");
    } else if (makeAppointmentError)
      alert("You alrady have active appointment");
  }, [makeAppointmentError]);

  const imgPath = "../assets/BarbersImages/";
  const time = [
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
  ];
  const [filteredTime, setFilteredTime] = useState<string[]>([]);
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);
  const [employees, setEmployees] = useState<[]>([]);
  const [appointmentData, setAppointmentData] = useState({});
  const [isMakingAppointment, setIsMakingAppointment] = useState(false);

  //
  useEffect(() => {
    if (showModal && AllEmployeesData) {
      setChosenEmployee(0);
      const updatedEmployees = AllEmployeesData.map((employee: Employee) => {
        return {
          ...employee,
          Schedule: JSON.parse(employee["Schedule"]),
        };
      });
      setEmployees(updatedEmployees);
    }
  }, [showModal, AllEmployeesData]);

  const handleSaveChanges = (e: FormEvent) => {
    e.preventDefault();
    const newAppointmentData = {
      time: chosenTime,
      date: chosenDate,
      employeeID: chosenEmployee,
      customerID: userID,
    };
    setIsMakingAppointment(true);
    setAppointmentData(newAppointmentData);
  };
  //If the appointment is being made fetch the data
  useEffect(() => {
    if (isMakingAppointment) makeNewAppointment(appointmentData);
  }, [appointmentData]);
  //When an appointmend is made, if the answer from be is success close the modal
  useEffect(() => {
    if (makeAppointmentResponse == "success")
      setTimeout(() => {
        toggleModal(showModal);
      }, 2000);
  }, [makeAppointmentResponse]);
  //Gettin appointments from backend when employee is chosen/changed

  //Setting the available time
  useEffect(() => {
    const employee = employees.find((value, index) => index == chosenEmployee);
    if (employee) {
      let keys = Object.keys(employee["Schedule"]);
      const ifDate = keys.find((value) => value == chosenDate);
      if (ifDate) {
        const filteredTime = time.filter((value) => {
          if (value !== employee["Schedule"][ifDate]) return value;
        });
        setFilteredTime(filteredTime);
      }
    }
    setIsEmployeeSelected(true);
  }, [chosenDate]);
  return (
    <>
      <form onSubmit={(e) => handleSaveChanges(e)}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-20 inset-0 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* Content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Make an appointment</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => toggleModal(showModal)}
                >
                  <span className="text-red-500 pl-10 text-2xl block outline-none focus:outline-none">
                    <IoClose />
                  </span>
                </button>
              </div>
              {/* Body */}
              {employees ? (
                <div
                  className="relative p-6 flex-auto
                "
                >
                  {/*All the employees */}

                  <Carousel
                    className="mb-8"
                    prevArrow={({ handlePrev, activeIndex }) => {
                      useEffect(() => {
                        setChosenEmployee(activeIndex);
                      }, [activeIndex]);

                      return (
                        <IconButton
                          variant="text"
                          size="lg"
                          onClick={handlePrev}
                          className="!absolute bottom-0 left-4 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                          </svg>
                        </IconButton>
                      );
                    }}
                    nextArrow={({ handleNext, activeIndex }) => {
                      useEffect(() => {
                        setChosenEmployee(activeIndex);
                      }, [activeIndex]);
                      return (
                        <IconButton
                          variant="text"
                          size="lg"
                          onClick={handleNext}
                          className="!absolute bottom-0 !right-4 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </IconButton>
                      );
                    }}
                  >
                    {employees.map((employee: Employee, index) => (
                      <Card key={index}>
                        <CardHeader
                          shadow={false}
                          floated={false}
                          className="sm:h-60 md:h-64"
                        >
                          <img
                            src={
                              employee.Image
                                ? `${imgPath + employee.Image}`
                                : "../assets/homePageImg1.jpg"
                            }
                            alt="card-image"
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody>
                          <div className="mb-2 text-center">
                            <Typography color="black" className="font-medium">
                              {employee.Name}
                            </Typography>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </Carousel>
                  {/* Date Picker */}
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input
                        label="Select a Date"
                        onChange={() => null}
                        value={date ? format(date, "yyyy-MM-dd") : ""}
                        crossOrigin={""}
                      />
                    </PopoverHandler>
                    <PopoverContent className="z-50">
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          const formattedDate = selectedDate
                            ? format(selectedDate, "yyyy-MM-dd")
                            : null;
                          setChosenDate(formattedDate ? formattedDate : "");
                          setDate(selectedDate as Date);
                        }}
                        showOutsideDays
                        className="border-0"
                        fromDate={new Date()}
                        required
                        footer={makeAppointmentResponse === "date"}
                      />
                    </PopoverContent>
                  </Popover>
                  {/* Time Picker */}
                  <div className="w-72 mt-5">
                    <Select
                      error={makeAppointmentResponse === "time"}
                      label="Select Time"
                      onChange={(time) => setChosenTime(time || "")}
                    >
                      {filteredTime.length == 0
                        ? time.map((time, index) => (
                            <Option
                              className="text-center"
                              key={index}
                              value={time}
                            >
                              {time}
                            </Option>
                          ))
                        : filteredTime.map((time, index) => (
                            <Option
                              className="text-center"
                              key={index}
                              value={time}
                            >
                              {time}
                            </Option>
                          ))}
                    </Select>
                    {makeAppointmentResponse === "time" && (
                      <Typography variant="small">
                        Please choose time for your appointment
                      </Typography>
                    )}
                  </div>
                </div>
              ) : (
                <div>No employees</div>
              )}
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 hover:bg-red-900 hover:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => toggleModal(showModal)}
                >
                  Close
                </button>
                <button
                  className="text-black hover:bg-black hover:text-white active:bg-blue-gray-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
                {makeAppointmentLoading && (
                  <span className="text-lg flex-grow text-center rounded-2xl">
                    In progress...
                  </span>
                )}
                {makeAppointmentResponse === "success" && (
                  <span className="bg-light-green-800 text-white text-lg flex-grow text-center rounded-2xl">
                    Successfuly made an appointment
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
      </form>
    </>
  );
};

export default Modal;
