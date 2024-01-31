import { useEffect, useState } from "react";
import Footer from "../components/footer";
import {getAllEmployees} from "../fetchData";
interface Employee {
  EmployeeID: number;
  Name: string;
  Addres: string;
  Image?: string;
}
const StaffPage = () =>{
  const imgPath="../assets/BarbersImages/";
  const { data: AllEmployeesData, loading: EmployeesLoadin, error: AllEmployeesError } =  getAllEmployees()
return(
<>
<div className="mx-auto bg-white pb-8">
  <section className="text-center sm:pt-0 md:pt-24">
    <h2 className= "pt-6 text-3xl font-bold">
      Meet the <u className="text-primary dark:text-primary-400">team</u>
    </h2>
    <div className="mt-6 px-6 grid gap-x-6 md:grid-cols-3 lg:gap-x-12" >
    {AllEmployeesData?.map((employee:Employee,index:any) =>(
    <div className="mb-6 lg:mb-0" key={index}>
      <div
        className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img src={imgPath + `${employee.Image}`} className="h-80 rounded-t-lg mx-auto" />
        </div>
        <div className="p-6">
          <h5 className="mb-4 text-lg font-bold">{employee.Name}</h5>
          <p className="mb-4 text-neutral-500">Chief Hair Stylist</p>
        </div>
      </div>
    </div>
    ))}
  </div>


  </section>
</div>
<Footer/>
</>
)}
export default StaffPage;