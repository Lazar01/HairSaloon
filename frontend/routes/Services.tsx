import React, { useEffect, useState } from "react";
import ServiceCard from "../components/serviceCard";
import Footer from "../components/footer";
import { getAllServices } from "../fetchData";
interface Service {
  ServiceID: number;
  Service_Name: string;
  Cost: number;
  Description: string;
}
interface ServiceProps {
  isAuthenticated: boolean;
  user: any;
}

const Service: React.FC<ServiceProps> = ({ isAuthenticated, user }) => {
  const [servicesData, setServicesData] = useState<Service[]>();
  const [servicesLoading, setServicesLoading] = useState<boolean>();
  const [servicesError, setServicesError] = useState<Error>();
  const { data, loading, error } = getAllServices();
  useEffect(() => {
    setServicesData(data);
    setServicesLoading(loading);
    setServicesError(error);
  }, [data]);
  return (
    <>
      <section className={error ? "bg-white h-full" : "bg-white h-auto"}>
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[510px] text-center lg:mb-20">
                <h2 className="mt-6 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
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
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Service;
