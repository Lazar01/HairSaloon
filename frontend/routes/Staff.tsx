import { useState } from "react";
import Footer from "../components/footer";
import { User } from "../hooks/verifyJWTHook";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import StaffCard from "../components/StaffComponents/staffCard";
import { getAllEmployees } from "../fetchData";
interface StaffProps {
  user: User;
  isAuthenticated: boolean;
}
interface Employee {
  EmployeeID: number;
  Name: string;
  Address: string;
  Image: string | null;
}
const StaffPage: React.FC<StaffProps> = ({ user, isAuthenticated }) => {
  const {
    data: AllEmployeesData,
    loading: EmployeesLoadin,
    error: AllEmployeesError,
    refetch,
  } = getAllEmployees();
  const [showAddModal, setShowAddModal] = useState(false);
  console.log(AllEmployeesData);
  return (
    <>
      <div className="mx-auto bg-white pb-8">
        {user.Role == "admin" && isAuthenticated && (
          <Button
            onClick={() => setShowAddModal(!showAddModal)}
            variant="filled"
            className="float-right mt-4"
          >
            <div className="flex flex-row">
              <FaPlus className="mt-auto mb-auto" />
              <Typography variant="small" className="">
                Add New Employee
              </Typography>
            </div>
          </Button>
        )}
        <section className="text-center sm:pt-0 md:pt-24">
          <h2 className="pt-6 text-3xl font-bold">
            Meet the <u className="text-primary dark:text-primary-400">team</u>
          </h2>
          <div className="mt-6 px-6 grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            {AllEmployeesData?.map((employee: Employee, index: number) => (
              <StaffCard
                isAuthenticated={isAuthenticated}
                user={user}
                name={employee.Name}
                address={employee.Address}
                image={employee.Image ? employee.Image : null}
                id={employee.EmployeeID}
                refetch={refetch}
                key={index}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default StaffPage;
