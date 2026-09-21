// managing the booking state in the Redux store
//store all bookings
//store individual booking details
//track the API loading status
//add new bookings when a booking is created
//updating the booking data when we receive new data from the backend



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    bookingDetails: {},
    loading: false,
    error: null,
}
const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {

        setBookingsRequest: (state) => {
            state.loading = true;
        },

        setBookings: (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        },

        addBooking: (state, action) => {
            state.bookings.push(action.payload);
            state.loading = false;
        },

        setBookingDetails: (state, action) => {
            state.bookingDetails = action.payload.bookings;
        }
    }
});
export const { setBookings, addBooking, setBookingDetails } = bookingSlice.actions;
export default bookingSlice;