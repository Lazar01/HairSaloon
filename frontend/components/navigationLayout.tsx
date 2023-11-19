import { Outlet, Link } from "react-router-dom";

function NavigationLayout() {
  return (
    <>
    <nav className="bg-slate-400 bg-opacity-25 flex">
    <div className="pl-6 flex h-24 items-center text-white font-extrabold leading-none tracking-tight  md:text-2xl drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] basis-2/12">Barber Saloon</div>
      <ul className="flex justify-center items-center basis-8/12 space-x-4">
        <li className="p-2 text-2xl hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] focus:underline">
          <Link to="/">
            <span className="">Home</span>
          </Link>
        </li>
        <li className="p-2 text-2xl hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
          <Link to="/blog">
            Blogs
          </Link>
        </li>
        <li className="p-2 text-2xl hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
          <Link to="/contact">
            Contact
          </Link>
        </li>
      </ul>
      <div className="flex items-center basis-2/12 text-white text-2xl font-extrabold drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">Welcome</div>
    </nav>
    <Outlet />
    </>
  );
}

export default NavigationLayout;
