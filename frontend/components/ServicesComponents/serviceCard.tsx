import { Typography, Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Modal from "../AppointmentComponents/modalMakeAppointment";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { editService, deleteService } from "../../fetchData";
import ModalConfirmDeleteService from "./modalConfirmDeleteService";
import { User } from "../../hooks/verifyJWTHook";

interface ServiceCardProps {
  title: string;
  details: string;
  price: number;
  isAuthenticated: boolean;
  preventEdit: boolean;
  id: number;
  setPreventEditing: (arg: boolean) => void;
  user: User;
  refetch: () => void;
}
interface ServiceValues {
  id: number;
  serviceName: string;
  cost: number;
  description: string;
}
const ServiceCard = ({
  title,
  id,
  details,
  price,
  isAuthenticated,
  user,
  setPreventEditing,
  preventEdit,
  refetch,
}: ServiceCardProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, error, loading, getData } = editService();
  const [isSuccessfulEdit, setIsSuccessfulEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [values, setValues] = useState<ServiceValues>({
    id: id,
    serviceName: title,
    cost: price,
    description: details,
  });
  const handleInput = (event: any) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(event.target.value);
  };
  const toggleModal = () => {
    if (!isAuthenticated) navigate("/");
    else setShowModal((prevShowModal) => !prevShowModal);
  };
  const toggleEditCard = (isEdit: boolean) => {
    setIsEditing(!isEdit);
    setPreventEditing(!preventEdit);
  };
  const handleSumbit = () => {
    setIsEditing(false);
    setPreventEditing(false);
    getData(values);
  };

  const handleDeleteAction = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    if (data && data == "success") {
      setIsSuccessfulEdit(true);
      refetch();
      setTimeout(() => {
        setIsSuccessfulEdit(false);
      }, 1500);
    }
  }, [data]);

  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {isSuccessfulEdit && (
          <div className="bg-light-green-800 text-white text-lg text-center rounded-2xl">
            Successfuly updated service.
          </div>
        )}

        <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
          {isAuthenticated && !preventEdit && user.Role == "admin" && (
            <div className="relative pb-6">
              <MdEdit
                className="hover:text-light-green-400 hover:scale-125 text-xl"
                onClick={() => toggleEditCard(isEditing)}
              />
              <MdDelete
                onClick={handleDeleteAction}
                className="absolute top-0 right-0 hover:text-red-600 hover:scale-125 text-xl"
              />
            </div>
          )}
          {isEditing ? (
            <form onSubmit={handleSumbit} className="flex flex-col gap-3">
              <Input
                name="serviceName"
                label="Service name"
                value={values.serviceName}
                crossOrigin="anonymus"
                onChange={handleInput}
              />
              <Input
                name="description"
                type="text"
                label="Description"
                value={values.description}
                crossOrigin="anonymus"
                onChange={handleInput}
              />
              <Input
                name="cost"
                label="Service Price"
                value={values.cost}
                crossOrigin="anonymus"
                onChange={handleInput}
              />
              <Button
                type="submit"
                ripple
                fullWidth={true}
                className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Submit changes
              </Button>
              <Button
                onClick={() => toggleEditCard(isEditing)}
                ripple
                fullWidth={true}
                className="bg-red-600 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Cancel
              </Button>
            </form>
          ) : (
            <>
              <h4 className="mb-[14px] text-2xl font-semibold text-dark">
                {title}
              </h4>
              <p className="text-body-color dark:text-dark-6">{details}</p>
              <Typography variant="lead" color="blue-gray" className="p-6 pl-0">
                {price}$
              </Typography>
              <Button
                onClick={() => toggleModal()}
                ripple
                fullWidth={true}
                className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Make appointment
              </Button>
            </>
          )}
        </div>
      </div>
      {showModal ? (
        <Modal
          userID={user.CustomerID}
          showModal={showModal}
          toggleModal={toggleModal}
        />
      ) : null}
      {isDeleting ? (
        <ModalConfirmDeleteService
          id={values.id}
          refetch={refetch}
          setShowModal={setIsDeleting}
        />
      ) : null}
    </>
  );
};
export default ServiceCard;
