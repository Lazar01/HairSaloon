import React, { useState, useEffect } from 'react';
import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

interface ModalProps {
  showModal: boolean;
  toggleModal: (showModal: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, toggleModal }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Do something when showModal changes, if needed
  }, [showModal]);

  const handleSaveChanges = () => {
    // Add logic to handle the save changes action
    // ...

    // Close the modal after handling the action
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
