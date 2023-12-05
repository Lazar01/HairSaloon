import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
function HomePage(){
    return(
        <div className="flex flex-col">
            <h2 className="pt-12 text-6xl text-center text-white font-extrabold leading-none tracking-tight  md:text-9xl dark:text-white drop-shadow-[0_1.6px_1.6px_rgba(0,0,0,1)]">Hair Barber</h2>
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
                
                <p className="pl-6 pr-6 pb-12 pt-12 md:pl-28 md:pr-28 text-center md:text-xl text-md text-white font-semibold bg-black h-full mt-12 flex items-center">
                Meet Lazar, your go-to expert for all things hair at Hair Barber. With a passion for the art of hair styling that's as sharp as his scissors, Lazar is a true maestro when it comes to transforming locks into works of art.

                Lazar brings years of experience to the barber's chair, making each haircut an unforgettable experience. His skillful hands can craft classic looks that stand the test of time, or he can push the boundaries with avant-garde styles that are on the cutting edge of fashion.

                Customer satisfaction is Lazar's top priority. He takes the time to listen to your desires and offers expert advice on what style suits you best, ensuring that you leave the chair feeling not only rejuvenated but also confident in your new look.

                Beyond his technical prowess, Lazar is known for his warm and welcoming demeanor. His chair isn't just a place to get your hair done; it's a space for relaxation and conversation, where you can unwind while Lazar works his magic.

                From classic scissor cuts to modern fades, beard trims to hot towel shaves, Lazar does it all with precision and style. Whether you're looking for a quick touch-up or a complete hair transformation, you can trust Lazar to deliver results that exceed your expectations.

                Book your appointment with Lazar at Hair Barber today and discover why he's the go-to choice for those who demand the best in hair care and styling. Elevate your look and experience the artistry of a true master barber.
                
                </p>
                <span className="bg-black flex justify-center pt-10 pb-6">
                    <Link to="/appointment"><Button variant="outlined" color="amber" className="text-xl md:text-2xl sm:w-32 sm:h-16 md:h-24 md:w-60 ">Make an appointment</Button></Link>
                </span>
                
        </div>
        
    );
}
export default HomePage;