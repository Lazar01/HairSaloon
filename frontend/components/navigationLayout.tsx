import { Outlet, Link } from "react-router-dom";
import { GiHamburgerMenu, GiBeard } from "react-icons/gi";
import { IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";
import headerBackground from "../assets/barberHeaderBackground.jpg";
import useVerifyAuthentication from "../hooks/verifyJWTHook";

function NavigationLayout() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useVerifyAuthentication();
  console.log(user);
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
          <li className="p-2  text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] focus:underline">
            <Link to="/home">
              <span className="">Home</span>
            </Link>
          </li>
          <li className="p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
            <Link to="/blog">Blogs</Link>
          </li>
          <li className="p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
            <Link to="/services">Services</Link>
          </li>
          <li className="p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
            <Link to="/staff">Staff</Link>
          </li>
          <li className="p-2 text-lg md:text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
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
                className="underline pl-2"
              >
                {" "}
                {user.Name}
              </Typography>
            </>
          ) : (
            <Link to="/">Login/Register</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavigationLayout;
