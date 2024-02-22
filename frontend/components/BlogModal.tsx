import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { addNewBlog } from "../fetchData";
interface ModalProps {
  setShowModal: (showModal: boolean) => void;
  refetch: () => void;
}
interface BlogValues {
  title: string;
  description: string;
  image: File | undefined;
  date: Date;
}
const NewBlogModal: React.FC<ModalProps> = ({ setShowModal, refetch }) => {
  const [values, setValues] = useState<BlogValues>({
    title: "",
    description: "",
    image: undefined,
    date: new Date(),
  });
  const { data, getData } = addNewBlog();
  const handleSumbit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    setValues((prev) => ({ ...prev, date: new Date() }));
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append(
      "date",
      values.date.toISOString().slice(0, 19).replace("T", " ")
    );
    if (values.image) formData.append("image", values.image);
    getData(formData);
  };
  const handleInput = (event: any) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setValues((prev) => ({ ...prev, image: file }));
  };
  useEffect(() => {
    if (data && data == "success") refetch();
  }, [data]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="sm:text-base md:text-3xl font-semibold">
                Add new blog card
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <IoCloseSharp className="text-black" />
                </span>
              </button>
            </div>
            {/*body*/}
            <form className="p-6 flex flex-col gap-6" onSubmit={handleSumbit}>
              <Input
                name="title"
                crossOrigin="anonymous"
                label="Header"
                onChange={handleInput}
                required
              ></Input>
              <Input
                name="description"
                crossOrigin="anonymous"
                label="Description"
                onChange={handleInput}
                required
              ></Input>
              <input
                name="image"
                type="file"
                onChange={handleImage}
                accept="image/*"
              ></input>

              {/*footer*/}
              {data == "success" && <span>Created new blog</span>}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-light-green-600 text-white active:bg-light-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowModal(false)}
        className="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
    </>
  );
};
export default NewBlogModal;
