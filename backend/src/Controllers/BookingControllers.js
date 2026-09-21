import {Booking} from "../Models/bookingModel.js";
import {Property} from "../Models/propertyModel.js";
//create: booking any property
const createOrder=async(req,res)=>{
    console.log("create order api hit");
    const {amount,propertyId,fromDate,toDate,guests,numberOfNights}=req.body;

    //orderId: order_4563472628682
    const orderId="order_"+Date.now();
    res.json({
        success:true,
        MessageChannel: "Order created successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests,
        numberOfNights
    });
    
}



//verify:payment
//23,26
//1.save booking in booking collection
//2.block these dates in property collection
const verifyPayment=async(req,res)=>{
    const {orderId,bookingDetails,forceStatus}=req.body;

console.log("VERIFY BODY:", req.body);
console.log("BOOKING DETAILS:", bookingDetails);
console.log("NUMBER OF NIGHTS:", bookingDetails?.numberOfNights);


    if(forceStatus==="success"){
        const paymentId="pay_"+ Date.now();
        //save booking in booking collection
        const booking=await Booking.create({
            user:req.user._id,
            property:bookingDetails.propertyId,
            price:bookingDetails.price,
            fromDate:bookingDetails.fromDate,
            toDate:bookingDetails.toDate,
            guests:bookingDetails.guests,
            numberOfNights:bookingDetails.numberOfNights,
            paid:true
        });
        // tell property those dates are taken
      const updatedProperty=await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBookings:{
                        bookingId:booking._id,
                        fromDate:bookingDetails.fromDate,
                        toDate:bookingDetails.toDate,
                        userId:req.user._id
                    }
                }
            },
            {returnDocument:"after"}
        );
        res.json({
            success:true,
            message:"Payment successful, and booking created successfully",
            paymentId,
            orderId,
            booking:booking
        });
    }else{
        res.json({
            success:false,
            message:"Payment failed",
            orderId
        });
    }          
        
}    


//get my bookings so that user can see his bookings
const getUserBookings = async (req,res) => {
    try {
        const bookings = await Booking.find({
            user: req.user._id
        }).populate("property");

        res.status(200).json({
            success: true,
            data: {
                bookings
            }
        });

    } catch(error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
// get one booking details
const getBookingDetails=async(req,res)=>{
    try{
        const bookings=await Booking.findById(req.params.bookingId);
        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })
    
    


    }catch(error){
        res.status(401).json({
            status:"fail",
            message:error.message
        })
    }

       
};
// cancel booking
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.bookingId,
            user: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // cancel booking
        booking.status = "cancelled";
        await booking.save();

        // remove booking dates from property
        await Property.findByIdAndUpdate(
            booking.property,
            {
                $pull: {
                    currentBookings: {
                        bookingId: booking._id
                    }
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export {getBookingDetails,getUserBookings,createOrder,verifyPayment,cancelBooking};