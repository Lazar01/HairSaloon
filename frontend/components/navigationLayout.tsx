import { Outlet, Link } from "react-router-dom";

function NavigationLayout() {
  return (
    <>
    <nav className="bg-black bg-opacity-75 sticky flex">
    <Link to="/" className="pl-12 flex h-24 items-center justify-center text-white font-extrabold leading-none tracking-tight  md:text-2xl drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] basis-2/12">
      <div className="">Barber Saloon   
        <img className="sm:h-6 md:h-10 ml-auto mr-auto" src="../assets/Logo.png"></img>  
      </div>
    </Link>
      <ul className="flex justify-center items-center basis-8/12 space-x-4">
        <li className="p-2 text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)] focus:underline">         
          <Link to="/">
            <span className="">Home</span>
          </Link>
        </li>
        <li className="p-2 text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
          <Link to="/blog">
            Blogs
          </Link>
        </li>
        <li className="p-2 text-2xl text-white hover:transform hover:scale-110 hover:animate-pulse drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">
          <Link to="/contact">
            Contact
          </Link>
        </li>
      </ul>
      <div className="basis-2/12 flex justify-center items-center text-white text-2xl font-extrabold drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">Welcome</div>
    </nav>
    <Outlet />
    </>
  );
}

export default NavigationLayout;

