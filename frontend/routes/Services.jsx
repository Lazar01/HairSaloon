import React from "react";
import ServiceCard from "../components/serviceCard"
import Footer from "../components/footer";
import { FaScissors } from "react-icons/fa6";
const Service = () => {
  return (
    <>
    <section className="bg-white">
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
          <ServiceCard
            icon={<img src="../assets/service1.jpg" className="justify-center rounded-2xl w-20 h-32 sm:w-32 sm:h-52 md:w-60 md:h-72 "/>}
            title="Fresh Cuts"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
          icon={<img src="../assets/service2.jpg" className="justify-center rounded-2xl w-20 h-32 sm:w-32 sm:h-52 md:w-60 md:h-72"/>}
            title="Unique barber styles"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="Anything that comes to your mind..."
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="Speed Optimized"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="Fully Customizable"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="Regular Updates"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Service;
