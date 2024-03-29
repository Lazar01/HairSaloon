import Footer from "../components/footer";
import BlogCard from "../components/BlogComponents/blogCard";
import { Button, Typography } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { getAllBlogs, addNewBlog } from "../fetchData";
import BlogModal from "../components/BlogComponents/addNewBlogModal";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface BlogProps {
  isAuthenticated: boolean;
  role: string;
}
interface Blog {
  BlogID: number;
  Title: string;
  Description: string;
  Date: Date;
  Image: string;
}

const BlogPage: React.FC<BlogProps> = ({ isAuthenticated, role }) => {
  const { data, error, loading, refetch } = getAllBlogs();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  console.log(blogs);
  useEffect(() => {
    if (data) setBlogs(data);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      {role == "admin" && isAuthenticated && (
        <Button
          onClick={() => setShowModal(!showModal)}
          variant="filled"
          className="float-right m-2"
        >
          <div className="flex flex-row">
            <FaPlus className="mt-auto mb-auto" />
            <Typography variant="small" className="pl-2">
              Add New Blog
            </Typography>
          </div>
        </Button>
      )}
      <section
        className={clsx(
          "bg-white p-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]",
          { "h-full": blogs.length == 0 }
        )}
      >
        <div className="container ml-auto mr-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-3xl font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color text-start">
                  Here, you can read about the latest news and insightful blogs
                  covering a diverse range of topics from around the world. Stay
                  informed and engaged with up-to-date information and diverse
                  perspectives curated to keep you informed and inspired.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogCard
                  isAuthenticated={isAuthenticated}
                  role={role}
                  date={blog.Date}
                  id={blog.BlogID}
                  CardTitle={blog.Title}
                  CardDescription={blog.Description}
                  image={blog.Image}
                  key={index}
                  refetch={refetch}
                />
              ))
            ) : (
              <Typography className="mx-auto sm:text-sm md:text-3xl ">
                There are no blogs at the moment.
              </Typography>
            )}
          </div>
        </div>
      </section>
      {showModal && <BlogModal refetch={refetch} setShowModal={setShowModal} />}
      <Footer />
    </>
  );
};
export default BlogPage;
