
import axiosInstance from "../../utils/axios.js";   
import { setBookingDetails,setBookings} from "./booking-slice.js";

//fetch all bookings
export const fetchBookingDetails = (bookingId)=> async(dispatch)=>{
    try{
        const response = await axiosInstance.get(`/v1/rent/user/bookings/${bookingId}`);
        dispatch(setBookingDetails(response.data.data));
    }catch(error){
        console.error("Error fetching booking details:", error);
    }
}
//fetch user bookings
export const fetchUserBookings = ()=> async(dispatch)=>{
    try{
        const response = await axiosInstance.get("/v1/rent/user/bookings");

        console.log("Bookings Response:", response.data);

        dispatch(setBookings(response.data.data.bookings.filter(booking => booking.status !== "concelled")));

    }catch(error){
        console.error("Error fetching bookings:", error);
    }
};
// cancel booking
export const cancelBooking = (bookingId) => async (dispatch, getState) => {
    try {
        const response = await axiosInstance.patch(
            `/v1/rent/user/bookings/${bookingId}/cancel`
        );

        console.log("Cancel Booking Response:", response.data);

        // Remove cancelled booking from frontend
        const currentBookings = getState().booking.bookings;

        const updatedBookings = currentBookings.filter(
            (booking) => booking._id !== bookingId
        );

        dispatch(setBookings(updatedBookings));

    } catch (error) {
        console.error("Error cancelling booking:", error);
    }
};