import { Outlet, Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu, GiBeard } from "react-icons/gi";
import { IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import headerBackground from "../assets/barberHeaderBackground.jpg";
import { CiLogout } from "react-icons/ci";
import clsx from "clsx";

interface NavLayoutProps {
  isAuthenticated: boolean;
  refetch: () => void;
  user: any;
}

const NavigationLayout: React.FC<NavLayoutProps> = ({
  isAuthenticated,
  refetch,
  user,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    refetch();
  };
  useEffect(() => {}, [isAuthenticated]);
  const location = useLocation();
  return (
    <>
      <nav
        className="bg-black bg-opacity-75 bg-blend-overlay flex justify-between bg-center"
        style={{ backgroundImage: `url(${headerBackground})` }}
      >
        <Link
          to="/home"
          className="mt-auto mb-auto pl-12 flex md:h-24 sm:h-12 items-center justify-center text-white font-extrabold leading-none tracking-tight  md:text-2xl drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] basis-2/12"
        >
          <GiBeard className="sm:h-6 sm:w-6 md:h-16 md:w-16 ml-auto mr-auto text-white" />
        </Link>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } justify-center md:items-center md:basis-8/12 md:space-x-4 md:flex`}
        >
          <li
            className={clsx(
              "p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]",
              { underline: location.pathname == "/home" }
            )}
          >
            <Link to="/home">
              <span className="">Home</span>
            </Link>
          </li>
          <li
            className={clsx(
              "p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]",
              { underline: location.pathname == "/blog" }
            )}
          >
            <Link to="/blog">Blogs</Link>
          </li>
          <li
            className={clsx(
              "p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]",
              { underline: location.pathname == "/services" }
            )}
          >
            <Link to="/services">Services</Link>
          </li>
          <li
            className={clsx(
              "p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]",
              { underline: location.pathname == "/staff" }
            )}
          >
            <Link to="/staff">Staff</Link>
          </li>
          <li
            className={clsx(
              "p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]",
              { underline: location.pathname == "/contact" }
            )}
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="basis-2/12 flex justify-center items-center text-white text-lg  md:text-2xl font-extrabold drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
          <div className="block md:hidden">
            <IconButton
              variant="gradient"
              className="rounded-full m-4"
              onClick={() => {
                setMenuOpen(!isMenuOpen);
              }}
            >
              <GiHamburgerMenu />
            </IconButton>
          </div>
          {isAuthenticated ? (
            <>
              <Typography variant="lead">Hello,</Typography>
              <Typography
                variant="lead"
                color="amber"
                className="underline p-2"
              >
                {" "}
                {user.Name}
              </Typography>
              <button onClick={handleLogOut}>
                <CiLogout />
              </button>
            </>
          ) : (
            <Link to="/">Login/Register</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavigationLayout;
