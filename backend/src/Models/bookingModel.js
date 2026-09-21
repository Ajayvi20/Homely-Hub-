//which property ?
//Which user
// price
// date
//guest
//paid
import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema(
    {
        property:{
            type:mongoose.Schema.ObjectId,
            ref:"Property",
            required:[true,"Booking must belong to a property"]
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:[true,"Booking must belong to a user"]
        },
        price:{
            type:Number,
            required:[true,"Booking must have a price"]
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
       
        paid:{
            type:Boolean,
            default:true
        },
        status:{
            type:String,
            enum:["confirmed","cancelled"],
            default:"confirmed"
        },
        fromDate:{
            type:Date,
            required:[true,"Booking must have a from date"]
        },
        toDate:{
            type:Date,
            required:[true,"Booking must have a to date"]
        },
        guests:{
            type:Number,
            required:[true,"Booking must have a number of guests"]
        },
        numberOfNights:{
            type:Number,
            required:[true,"Booking must have a number of nights"]
        }

    },
    {timestamps:true}
);

bookingSchema.pre(/^find/,function(){  //^find : find, findOne, findById, findOneAndUpdate, findOneAndDelete
    this.populate("user");
        this.populate({   //populate the user field with the user document
        path:"property",
        select:  " maximumGuests images propertyname  address"

    });


   


})
const Booking=mongoose.model("Booking",bookingSchema);


export {Booking};
