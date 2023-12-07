import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Modal from "../components/modal"
  import { useState } from "react";
function HomePage(){
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    console.log("Pokrenuto");
    setShowModal((prevShowModal) => !prevShowModal);
  };
    return(
        <div className="flex flex-col">
            <h2 className="pt-12 text-6xl text-center text-white font-extrabold leading-none tracking-tight  md:text-9xl drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">Hair Barber</h2>
                <div className="flex md:pl-52 md:pr-52 pl-12 pr-12 justify-between pt-24 items-center">
                    <Card className="w-96">
                        <CardHeader shadow={false} floated={false} className="h-80">
                            <img
                            src="../assets/homePageImg1.jpg"
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium">
                            A clean angled haircut
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                $115.00
                            </Typography>
                            </div>
                            <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                            >
                            A clean angled haircut features a precise and defined look with hair cut at an angle, creating sharp lines and a polished appearance.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                            ripple={false}
                            fullWidth={true}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                            Make appointment
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-96">
                        <CardHeader shadow={false} floated={false} className="h-80">
                            <img
                            src="../assets/homePageImg2.jpg"
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium">
                                Fade
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                $95.00
                            </Typography>
                            </div>
                            <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                            >
                            A fade haircut is a short hairstyle with a gradual transition from short to shorter hair, 
                            starting at the sides and back and blending into longer hair on top.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                            ripple={false}
                            fullWidth={true}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                            Make appointment
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                
                <h1 className="block font-sans pt-12 text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit text-center mt-12 bg-black text-white">
                 About us
                </h1>


                <p className="pl-6 pr-6 pb-12 md:pl-28 md:pr-28 md:text-xl text-md text-white font-semibold bg-black h-full flex items-center text-justify">

                Meet Lazar, your go-to expert for all things hair at Hair Barber. With a passion for the art of hair styling that's as sharp as his scissors, Lazar is a true maestro when it comes to transforming locks into works of art.

                Lazar brings years of experience to the barber's chair, making each haircut an unforgettable experience. His skillful hands can craft classic looks that stand the test of time, or he can push the boundaries with avant-garde styles that are on the cutting edge of fashion.

                Customer satisfaction is Lazar's top priority. He takes the time to listen to your desires and offers expert advice on what style suits you best, ensuring that you leave the chair feeling not only rejuvenated but also confident in your new look.

                Beyond his technical prowess, Lazar is known for his warm and welcoming demeanor.
                
                </p>
                <span className="bg-black flex justify-center pt-10 pb-6">
                    <Button onClick={() => setShowModal(!showModal)} variant="outlined" color="amber" className="text-xl md:text-2xl sm:w-32 sm:h-16 md:h-24 md:w-60 ">Make an appointment</Button>
                </span>
                {showModal ? <Modal showModal={showModal} toggleModal={toggleModal} /> : null}
        </div>
        
    );
}
export default HomePage;