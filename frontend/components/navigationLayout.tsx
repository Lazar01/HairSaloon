import { Outlet, Link } from "react-router-dom";

function NavigationLayout() {
  return (
    <>
    <nav className="bg-yellow-500">
      <ul className="flex justify-center items-center">
        <li className="pr-10 text-2xl hover:transform hover:scale-110 hover:animate-pulse">
          <Link to="/">
            Home
          </Link>
        </li>
        <li className="pr-10 text-2xl hover:transform hover:scale-110 hover:animate-pulse">
          <Link to="/blog">
            Blogs
          </Link>
        </li>
        <li className="text-2xl hover:transform hover:scale-110 hover:animate-pulse">
          <Link to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
}

export default NavigationLayout;
