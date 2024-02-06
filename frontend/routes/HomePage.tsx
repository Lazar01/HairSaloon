import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Modal from "../components/modalMakeAppointment"
  import { useState } from "react";
  import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";
import { FcAbout } from "react-icons/fc";
import { FaScissors } from "react-icons/fa6";
import { GiBeard } from "react-icons/gi";
function HomePage(){
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
    return(
        <div className="flex flex-col bg-white">
            <h2 className="pt-12 text-6xl text-center text-black font-extrabold leading-none tracking-tight sm:text-6xl  md:text-8xl drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">Barber</h2>
            
            <Carousel className='mt-8 mb-8 w-3/5 h-80 mx-auto'
                    prevArrow={({ handlePrev, activeIndex }) => {
                    return(  
                    <IconButton
                      variant="text"
                      size="lg"
                      onClick={handlePrev}
                      className="!absolute bottom-10 left-4 bg-white bg-opacity-80 hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </IconButton>
                  )}}
                  nextArrow={({ handleNext }) => (
                    <IconButton
                      variant="text"
                      size="lg"
                      onClick={handleNext}
                      className="!absolute bottom-10 !right-4 bg-white bg-opacity-80 hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </IconButton>
                  )} >
                    <img src="../assets/barberHeaderBackground.jpg" className="w-full h-full rounded-lg"></img>
                    <img src="../assets/homePageCarousel1.jpg" className="w-full h-full rounded-lg"></img>
                    </Carousel>
            <div className="grid grid-cols-3 gap-4  px-6 pt-6 pb-12">
              
                <Typography className="text-sm md:text-base">
                <FcAbout className="mx-auto w-10 h-auto pb-2"/>
                    Welcome to HairBarber, where style meets sophistication in the world of hair care and beauty. Nestled in the heart of Pancevo, our salon is a haven for those seeking a personalized and luxurious grooming experience.

                    Whether you're looking for a bold new look, a fresh cut, or simply a rejuvenating treatment, our talented experts are here to make your hair dreams a reality.
                </Typography>
                  
                <Typography className="border-l-4 border-r-4 p-2 border-black text-sm md:text-base">
                  <FaScissors className="mx-auto w-8 h-auto pb-2"/>
                  Our salon exudes a modern and inviting atmosphere, where comfort and creativity converge. We pride ourselves on staying ahead of the latest trends and techniques, ensuring that our clients receive cutting-edge services tailored to their individual preferences.
                    We understand that each client is unique, and our commitment to personalized service sets us apart.
                </Typography>

                <Typography className="text-sm md:text-base">
                  <GiBeard className="mx-auto w-10 h-auto pb-2"/>
                  At HairBarber, we use only the finest products and tools to achieve exceptional results. Our passion for quality extends beyond the salon chair, as we are dedicated to creating an environment that promotes beauty, confidence, and well-being.

                  Welcome to HairBarber - where style is crafted, and beauty is celebrated!
                </Typography>
              </div>
           
                

                <Link to="/staff">
                        <h1 className="text-center p-6 font-serif sm:text-3xl md:text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit text-white bg-black">
                            Meet our staff
                        </h1>
                </Link>
                <div className="bg-black">
                    <div className=" p-10 flex">
                        <Link to="/staff" className="block w-1/2 my-auto"><img src="../assets/BarbersImages/barberDarko.jpg" alt="image" className="w-auto h-auto rounded-full"></img></Link>
                        <Typography className="p-6 my-auto w-1/2 text-white sm:text-xs md:text-lg" variant="lead">
                        Our team at HairBarber comprises a dynamic group of highly skilled and passionate professionals dedicated to elevating your grooming experience to new heights.
                        From precision haircuts to expert styling, our talented barbers are not just stylists; they are artists who understand the nuances of hair design.
                        Continuously honing their craft and staying abreast of the latest trends, our team is committed to providing you with the cutting-edge techniques and personalized attention that you deserve.
                        With a keen eye for detail and a commitment to excellence, our staff is here to transform your vision into a reality, leaving you looking and feeling your absolute best. Experience the artistry and skill of our HairBarber team, where every haircut is a masterpiece and every client is a canvas awaiting the perfect creation.
                        </Typography>
                    </div>
                    

                </div>
                
                <Link to="./services" className="pt-12 w-fit mx-auto">
                <h1 className="font-serif sm:text-3xl md:text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit bg-white text-black italic underline w-auto">
                Services
                </h1>
                </Link>
                <div className="flex pt-6 mt-12 pb-16 flex-col md:flex-row justify-center gap-x-12 sm:gap-y-12 md:gap-y-0 items-center">
                    <Card className="w-96 bg-black bg-opacity-90">
                        <CardHeader shadow={false} floated={false} className="sm:h-60 md:h-64">
                            <img
                            src="../assets/homePageImg1.jpg"
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                            <Typography color="white" className="font-medium">
                            A clean angled haircut
                            </Typography>
                            <Typography color="blue" className="font-medium">
                                $115.00
                            </Typography>
                            </div>
                            <Typography
                            variant="small"
                            color="white"
                            className="font-normal opacity-75"
                            >
                            A clean angled haircut features a precise and defined look with hair cut at an angle, creating sharp lines and a polished appearance.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                            onClick={() => setShowModal(!showModal)}
                            ripple={false}
                            fullWidth={true}
                            className="bg-white text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                            Make appointment
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-96 bg-black bg-opacity-90">
                        <CardHeader shadow={false} floated={false} className="sm:h-60 md:h-64">
                            <img
                            src="../assets/homePageImg2.jpg"
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                            <Typography color="white" className="font-medium">
                            A clean angled haircut
                            </Typography>
                            <Typography color="blue" className="font-medium">
                                $115.00
                            </Typography>
                            </div>
                            <Typography
                            variant="small"
                            color="white"
                            className="font-normal opacity-75"
                            >
                            A clean angled haircut features a precise and defined look with hair cut at an angle, creating sharp lines and a polished appearance.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                            onClick={() => setShowModal(!showModal)}
                            ripple={false}
                            fullWidth={true}
                            className="bg-white text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                            Make appointment
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-96 bg-black bg-opacity-90">
                        <CardHeader shadow={false} floated={false} className="sm:h-60 md:h-64">
                            <img
                            src="../assets/homePageImg3.jpg"
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                            <Typography color="white" className="font-medium">
                                Fade
                            </Typography>
                            <Typography color="blue" className="font-medium">
                                $95.00
                            </Typography>
                            </div>
                            <Typography
                            variant="small"
                            color="white"
                            className="font-normal opacity-75"
                            >
                            A fade haircut is a short hairstyle with a gradual transition from short to shorter hair, 
                            starting at the sides and back and blending into longer hair on top.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                            onClick={() => setShowModal(!showModal)}
                            ripple={false}
                            fullWidth={true}
                            className="bg-white text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                            Make appointment
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                {showModal ? <Modal showModal={showModal} toggleModal={toggleModal} /> : null}
                <Footer/>
        </div>
        
    );
}
export default HomePage;