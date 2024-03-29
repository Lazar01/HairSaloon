import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconButton } from "@material-tailwind/react";
import EditBlog from "./editBlogModal";
import { deleteBlog } from "../../fetchData";
const BlogCard = ({
  image,
  id,
  date,
  CardTitle,
  CardDescription,
  isAuthenticated,
  role,
  refetch,
}) => {
  const [EditMode, setEditMode] = useState(false);
  const {
    getData: DeleteBlog,
    data: DeleteBlogResponse,
    error,
    loading,
  } = deleteBlog();
  const imageUrl = "../assets/BlogImages/" + image;
  function handleEdit(mode, event) {
    event.stopPropagation();
    setEditMode(mode);
  }
  function handleDelete(event) {
    event.stopPropagation();
    DeleteBlog({ id: id });
  }
  useEffect(() => {
    if (DeleteBlogResponse && DeleteBlogResponse == "success") refetch();
  }, [DeleteBlogResponse]);
  return (
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
              <IconButton onClick={(e) => handleDelete(e)}>
                <MdDelete />
              </IconButton>
            </div>
          )}
          <img
            src={
              image ? imageUrl : "../../assets/BlogImages/placeholder-image.jpg"
            }
            alt="Image"
            className="w-full h-80"
          />
        </div>

        <div>
          {date && (
            <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose">
              {date}
            </span>
          )}
          <h3>
            <span className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
              {CardTitle}
            </span>
          </h3>
          <p className="text-base text-body-color dark:text-dark-6">
            {CardDescription}
          </p>
        </div>
      </div>
      {EditMode && (
        <EditBlog
          title={CardTitle}
          desc={CardDescription}
          image="../assets/service1.jpg"
          setShowModal={setEditMode}
          id={id}
          refetch={refetch}
        />
      )}
    </div>
  );
};
export default BlogCard;
