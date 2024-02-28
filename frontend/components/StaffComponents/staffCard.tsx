import React from "react";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconButton } from "@material-tailwind/react";
import { User } from "../../hooks/verifyJWTHook";
import EditStaff from "./editStaff";
import DeleteStaffModal from "./deleteStaffModal";

interface StaffCardProps {
  user: User;
  isAuthenticated: boolean;
  name: string;
  address: string;
  image: string | null;
  id: number;
  refetch: () => void;
}

const StaffCard: React.FC<StaffCardProps> = ({
  user,
  isAuthenticated,
  name,
  address,
  image,
  id,
  refetch,
}) => {
  const [EditMode, setEditMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleEdit(mode: boolean, event: React.MouseEvent) {
    event.stopPropagation();
    setEditMode(mode);
  }
  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();
    setIsDeleting(true);
  }
  const imgPath = "../assets/BarbersImages/";

  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          {isAuthenticated && user.Role && (
            <>
              <div className="absolute top-2 left-4">
                <IconButton onClick={(e) => handleEdit(!EditMode, e)}>
                  <MdEdit />
                </IconButton>
              </div>
              <div className="absolute top-2 right-4">
                <IconButton onClick={(e) => handleDelete(e)}>
                  <MdDelete />
                </IconButton>
              </div>
            </>
          )}
          <img
            src={imgPath + `${image}`}
            className="h-80 rounded-t-lg mx-auto"
          />
        </div>
        <div className="p-6">
          <h5 className="mb-4 text-lg font-bold">{name}</h5>
          <p className="mb-4 text-neutral-500">Chief Hair Stylist</p>
        </div>
      </div>

      {EditMode && (
        <EditStaff
          name={name}
          address={address}
          image={image}
          setShowModal={setEditMode}
          id={id}
          refetch={refetch}
        />
      )}
      {isDeleting ? (
        <DeleteStaffModal
          id={id}
          refetch={refetch}
          setShowModal={setIsDeleting}
        />
      ) : null}
    </>
  );
};

export default StaffCard;
