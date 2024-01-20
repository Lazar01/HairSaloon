import React, { useState, useEffect, FormEvent } from 'react';
import { Input, Popover, PopoverHandler, PopoverContent, Select, Option, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import {getAllEmployees} from "../fetchData";
import { useLazyAxios } from 'use-axios-client';

interface ModalProps {
  showModal: boolean;
  toggleModal: (showModal: boolean) => void;
}

interface Appointment {
  AppointmentID: number;
  Time: string;
  Date: Date;
  EmployeeID: number;
  CustomerID: number;
}

interface Employee {
  EmployeeID: number;
  Name: string;
  Addres: string;
  Image?: string;
}

const Modal: React.FC<ModalProps> = ({ showModal, toggleModal }) => {
   
  const { data: AllEmployeesData, loading: EmployeesLoadin, error: AllEmployeesError } =  getAllEmployees()

  const [makeAppointment, { data: makeAppointmentData, error: makeAppointmentError, loading: makeAppointmentLoading }] = useLazyAxios({
    url: 'http://localhost:3000/makeAppointment',
    method:"POST",
  });

  const [getAppointments, { data: getAppointmentData, error: getAppointmentDataError, loading: getAppointmentDataLoading }] = useLazyAxios({
    url: 'http://localhost:3000/makeAppointment',
    method:"GET",
  });
  //const getData = (reqData:any) => makeAppointment();

  const [alreadyReservedTimes, setReservedTimes] = useState<string[]>([]);
  const [date, setDate] = useState<Date|undefined>(undefined);
  const [chosenDate, setChosenDate] = useState("");
  const [chosenTime, setChosenTime] = useState("");
  const [chosenEmployee, setChosenEmployee] = useState(0);
  const time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  const [filteredTime, setFilteredTime] = useState<string[]>([]);
  const [employees, setEmployees] = useState<[]>([]);
  const [appointmentData,setAppointmentData] = useState({});
  const [isMakingAppointment, setIsMakingAppointment] = useState(false);

    useEffect(() => {
      if (showModal && AllEmployeesData) {
        setChosenEmployee(AllEmployeesData[0].employeeID);
        const reservedTimes = AllEmployeesData[0]?.map((appointment: Appointment) => appointment.Time.split(':').slice(0, 2).join(':'));
        setEmployees(AllEmployeesData[1]?.map((employee: Employee) => employee))
        setReservedTimes(reservedTimes);
      }
    }, [showModal, AllEmployeesData]);

    useEffect(()=>{   
      if(AllEmployeesData)
        setFilteredTime(time.filter(item=> !alreadyReservedTimes.includes(item)));
    }, [showModal, AllEmployeesData])


    const handleSaveChanges = (e : FormEvent) => {
      e.preventDefault();
      const newAppointmentData = {
        // Add your appointment data here
        time: chosenTime,
        date: chosenDate,
        employeeID: chosenEmployee,
        customerID: 1,
      };
      setIsMakingAppointment(true);
      setAppointmentData(newAppointmentData);
    };
    useEffect(()=>{
      if(isMakingAppointment)
      {
        makeAppointment(appointmentData);
        setTimeout(() => {toggleModal(showModal)}, 2000);
      }

    },[appointmentData])

    function handleChosenEmployee(employeeID: any){
      setChosenEmployee(employeeID)
      getAppointments({})

    }





  return (
    <>
      {showModal ? (
        <>
        <form onSubmit={(e)=>handleSaveChanges(e)}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-20 inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Make an appointment
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => toggleModal(showModal)}
                  >
                    <span className="text-red-900 pl-10 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto
                ">
                  {employees.map((employee:Employee,index) => (
                  <Card className={`w-40 bg-white mb-8 ${chosenEmployee === employee.EmployeeID ? 'border-2 border-blue-500' : 'border-2 border-gray-300'}`} key={index} onClick={() => handleChosenEmployee(employee.EmployeeID)}>
                        <CardHeader shadow={false} floated={false} className="sm:h-60 md:h-64">
                        <img
                          src={employee.Image ? employee.Image : "../assets/homePageImg1.jpg"}
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
                        onSelect={(selectedDate) => {const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
                        setChosenDate(formattedDate? formattedDate: "");
                        setDate(selectedDate);}}
                        showOutsideDays
                        className="border-0"
                        // ... (other configurations)
                      />
                    </PopoverContent>
                  </Popover>
                
                  <div className="w-72 mt-5">
                  <Select label="Select Time" onChange={(time) => setChosenTime(time || "")}>
                    {filteredTime.map((time, index) => (
                      <Option className='text-center' key={index} value={time}>
                        {time}
                      </Option>
                    ))}
                  </Select>
                  </div>
                </div>
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
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
          </form>
        </>
      ) : null}
    </>
  );
};

export default Modal;
