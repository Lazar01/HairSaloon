import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServicesComponents/serviceCard";
import Footer from "../components/footer";
import { getAllServices } from "../fetchData";
import { Button, Typography } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { User } from "../hooks/verifyJWTHook";
import NewServiceModal from "../components/ServicesComponents/modalMakeNewService";
import clsx from "clsx";
interface Service {
  ServiceID: number;
  Service_Name: string;
  Cost: number;
  Description: string;
}
interface ServiceProps {
  isAuthenticated: boolean;
  user: User;
}

const Service: React.FC<ServiceProps> = ({ isAuthenticated, user }) => {
  const [servicesData, setServicesData] = useState<Service[]>();
  const [servicesLoading, setServicesLoading] = useState<boolean>();
  const [servicesError, setServicesError] = useState<Error>();
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error, refetch } = getAllServices();
  const [preventEditing, setPreventEditing] = useState(false);
  useEffect(() => {
    setServicesData(data);
    setServicesLoading(loading);
    setServicesError(error);
  }, [data]);
  if (servicesError) return <div>{servicesError.message}</div>;
  return (
    <>
      {user.Role == "admin" && isAuthenticated && (
        <Button
          onClick={() => setShowModal(!showModal)}
          variant="filled"
          className="float-right m-2"
        >
          <div className="flex flex-row">
            <FaPlus className="mt-auto mb-auto" />
            <Typography variant="small" className="pl-2">
              Add New Service
            </Typography>
          </div>
        </Button>
      )}
      <div
        className={clsx("container mx-auto", {
          "bg-white h-full": error,
          "bg-white h-auto": !error,
        })}
      >
        <div className="-mx-4 flex flex-wrap mt-20">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[510px] text-center lg:mb-20">
              <h2 className="text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          {!servicesLoading ? (
            servicesData?.map((service: Service, index) => (
              <ServiceCard
                key={index}
                title={service.Service_Name}
                details={service.Description}
                price={service.Cost}
                id={service.ServiceID}
                isAuthenticated={isAuthenticated}
                user={user}
                preventEdit={preventEditing}
                setPreventEditing={setPreventEditing}
                refetch={refetch}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
      {showModal && (
        <NewServiceModal refetch={refetch} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Service;
