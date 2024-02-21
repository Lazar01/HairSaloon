import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, IconButton, Input } from "@material-tailwind/react";
const BlogCard = ({
  image,
  date,
  CardTitle,
  CardDescription,
  isAuthenticated,
  role,
}) => {
  const [EditMode, setEditMode] = useState(false);
  function handleEdit(mode, event) {
    event.stopPropagation();
    setEditMode(mode);
  }
  console.log(EditMode);
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">
          <div className="relative mb-8 overflow-hidden rounded">
            {isAuthenticated && role && (
              <div className="absolute top-0 left-0 m-2">
                <IconButton onClick={(e) => handleEdit(!EditMode, e)}>
                  <MdEdit />
                </IconButton>
              </div>
            )}
            {isAuthenticated && role && (
              <div className="absolute top-0 right-0 m-2">
                <IconButton onClick={(e) => e.stopPropagation()}>
                  <MdDelete />
                </IconButton>
              </div>
            )}
            <img src="../assets/service1.jpg" alt="" className="w-full h-80" />
          </div>

          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
            )}
            <h3>
              <span className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {CardTitle}
              </span>
            </h3>
            <p className="text-base text-body-color dark:text-dark-6">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogCard;
