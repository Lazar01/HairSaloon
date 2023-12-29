import React from "react";
import ServiceCard from "../components/serviceCard"
import Footer from "../components/footer";
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
            title="Refreshing Design"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="Based on Tailwind CSS"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
          <ServiceCard
            title="100+ Components"
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
