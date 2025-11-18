import React from "react"
import { useState, useEffect } from "react";
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"
import { apiConnector } from "../services/apiconnector";
import { ratingsEndpoints } from "../services/apis";

const Contact = () => {
   const [reviews, setReviews] = useState([]);
 useEffect(() => {
   const fecthAllReviews = async () => {
     try {
       const response = await apiConnector(
         "GET",
         ratingsEndpoints.REVIEWS_DETAILS_API
       );

       if (response) {
         if (!response.data.success) {
           throw new Error(response.data.message);
         }
         setReviews(response?.data?.data);
         // console.log("REVIEWS_DETAILS_API RESPONSE.....",response)
       }
     } catch (error) {
       console.log("ERROR IN GETTING ALL REVIEWS....", error);
     }
   };

   fecthAllReviews();
 }, []);
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider reviews={reviews}/>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
