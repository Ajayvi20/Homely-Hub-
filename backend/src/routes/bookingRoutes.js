import express from "express";
const bookingRouter=express.Router();


import{getBookingDetails,getUserBookings,createOrder,verifyPayment,cancelBooking} from "../Controllers/BookingControllers.js";

import { protect } from "../Controllers/authControllers.js";

bookingRouter.get("/",protect,getUserBookings);  //get all bookings of user
bookingRouter.get("/:bookingId",getBookingDetails);  //get booking details of a particular booking
bookingRouter.post("/create-order",protect,createOrder);  //create order for booking
bookingRouter.post("/verify-payment",protect,verifyPayment);  //verify payment for booking
bookingRouter.patch("/:bookingId/cancel",protect,cancelBooking);  //cancel booking

export {bookingRouter};
