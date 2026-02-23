import { useRef, useState } from "react";
import { location, email, phonecall } from "../assets";
import { Footer } from "../Components";
import emailjs from "@emailjs/browser";

const Contect = () => {
  const form = useRef();

  const [userData, setUserData] = useState({
    aboutemail: "",
    description: "",
  });

  const sendEmail = (e) => {
    console.log(userData);
    e.preventDefault();

    if (
      userData.aboutemail?.trim().length === 0 ||
      userData.description?.trim().length === 0
    ) {
      return alert("All Fields are required.");
    }

    emailjs
      .sendForm(
        "service_ng43nmk",
        "template_n5whqqk",
        userData,
        "tzOrC9B3y97X3UctK"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error);
        }
      );

    setUserData({});
  };

  const handleonChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full flex flex-col justify-between items-center gap-12 mt-5 font-Poppins px-6 lg:px-20 mx-auto max-w-7xl">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Contact info cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-8 shadow-lg shadow-gray-100 rounded-2xl flex flex-col items-center text-center gap-4 border border-gray-50 flex-1">
            <div className="w-16 h-16 bg-green-50 flex items-center justify-center rounded-2xl">
              <img src={location} alt="Location" className="w-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Office Address</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                201, Swashtik Society, Naranpura,<br />Ahmedabad, Gujarat
              </p>
            </div>
          </div>

          <div className="bg-white p-8 shadow-lg shadow-gray-100 rounded-2xl flex flex-col items-center text-center gap-4 border border-gray-50 flex-1">
            <div className="w-16 h-16 bg-green-50 flex items-center justify-center rounded-2xl">
              <img src={email} alt="Email" className="w-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Email Us</h3>
              <p className="text-sm text-gray-500">
                contact@ecobazar.com<br />support@ecobazar.com
              </p>
            </div>
          </div>

          <div className="bg-white p-8 shadow-lg shadow-gray-100 rounded-2xl flex flex-col items-center text-center gap-4 border border-gray-50 flex-1">
            <div className="w-16 h-16 bg-green-50 flex items-center justify-center rounded-2xl">
              <img src={phonecall} alt="Phone" className="w-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Call Us</h3>
              <p className="text-sm text-gray-500">
                +91 0000000000<br />+91 9999999999
              </p>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="lg:col-span-8 bg-white p-8 lg:p-12 shadow-xl shadow-gray-100 rounded-3xl border border-gray-50">
          <div className="mb-10">
            <h1 className="font-black text-3xl md:text-4xl text-gray-900 mb-4 tracking-tight">Just Say Hello!</h1>
            <p className="text-gray-500 max-w-xl">
              Do you fancy saying hi or want to get started with your organic journey? 
              Feel free to contact us and we will get back to you shortly.
            </p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full border border-gray-200 bg-gray-50 text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  name="aboutemail"
                  value={userData?.aboutemail}
                  onChange={handleonChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="Email Address"
                />
            </div>
            <textarea
              name="description"
              value={userData?.description}
              onChange={handleonChange}
              required
              rows="6"
              className="w-full border border-gray-200 bg-gray-50 text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
              placeholder="How can we help you?"
            />
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="w-full h-[450px] overflow-hidden rounded-3xl shadow-xl mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.568060525836!2d72.55975347521209!3d23.03962657916187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848b5c490c6b%3A0xf14b0795bcd3f161!2sPolaris%20Building%2C%20Swastik%20Society%20Cross%20Rd%2C%20Swastik%20Society%2C%20Navrangpura%2C%20Ahmedabad%2C%20Gujarat%20380009!5e0!3m2!1sen!2sin!4v1712770113368!5m2!1sen!2sin"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Contect;
