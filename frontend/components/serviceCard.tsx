import { Typography, Button } from "@material-tailwind/react";
import React, { ReactNode, useState } from "react";
import Modal from "./modalMakeAppointment";



interface ServiceCardProps {
  title: string;
  details: string;
  price: number;
}


const ServiceCard = ({ title, details, price }: ServiceCardProps): JSX.Element => {


  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
  setShowModal((prevShowModal) => !prevShowModal);}


    return (
      <>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
            <p className="text-body-color dark:text-dark-6">{details}</p>
            <Typography variant="lead" color="blue-gray" className="p-6 pl-0">{price}$</Typography>
            <Button
              onClick={() => setShowModal(!showModal)}
              ripple
              fullWidth={true}
              className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
              Make appointment
            </Button>
          </div>
        </div>
        {showModal ? <Modal showModal={showModal} toggleModal={toggleModal} /> : null}
      </>
    );
  };
  export default ServiceCard