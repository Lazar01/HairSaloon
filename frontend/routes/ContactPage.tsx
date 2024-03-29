import { useState } from "react";
import Footer from "../components/footer";
import { Button } from "@material-tailwind/react";
import { SendEmail } from "../fetchData";
function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { getData, data, error, loading } = SendEmail();

  return (
    <>
      <section className="ml-auto mr-auto bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-900  sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form
            action="#"
            className="space-y-8"
            onSubmit={() =>
              getData({ subject: subject, message: message, email: email })
            }
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-black"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                onChange={(e) => setSubject(e.target.value)}
                className="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-black shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                onChange={(e) => setMessage(e.target.value)}
                className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-black focus:ring-primary-500 focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <Button
              type="submit"
              variant="outlined"
              color="deep-purple"
              className="py-3 px-5 text-sm font-medium text-center text-black rounded-lg sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Send message
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ContactPage;
