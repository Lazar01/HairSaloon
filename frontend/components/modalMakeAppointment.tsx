import React, { useState, useEffect } from 'react';
import { Input, Popover, PopoverHandler, PopoverContent, Select, Option } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import App from "../fetchData"

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

const Modal: React.FC<ModalProps> = ({ showModal, toggleModal }) => {
  const { data, loading, error } = showModal
    ? App("http://localhost:3000/getAppointments", "GET")
    : { data: null, loading: false, error: null };

  const [alreadyReservedTimes, setReservedTimes] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  const [filteredTime, setFilteredTime] = useState<string[]>([]);

    useEffect(() => {
      if (showModal && data) {
        const reservedTimes = data?.map((appointment: Appointment) => appointment.Time.split(':').slice(0, 2).join(':'));
        setReservedTimes(reservedTimes);
      }
    }, [data, showModal]);

    useEffect(()=>{
      if(showModal)
        setFilteredTime(time.filter(item=> !alreadyReservedTimes.includes(item)));
    }, [showModal, alreadyReservedTimes])
  const handleSaveChanges = () => {
    
    toggleModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
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
                  {/* Date Picker */}
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input
                        label="Select a Date"
                        onChange={() => null}
                        value={date ? format(date, "PPP") : ""}
                        crossOrigin={""}
                      />
                    </PopoverHandler>
                    <PopoverContent className="z-50">
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        // ... (other configurations)
                      />
                    </PopoverContent>
                  </Popover>
                
                  <div className="w-72 mt-5">
                    <Select label="Select Time">
                      {filteredTime.map((time,index) => (
                        <Option className='text-center' key={index}>{time}</Option>
                      ))
                      }
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
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
