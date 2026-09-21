import slugify from "slugify";
import mongoose from "mongoose";


const propertySchema=new mongoose.Schema({   // property schema
    propertyname: {
        type: String,
        required: [true,"Please enter the property name"],
        unique: true
    },
    description: {
        type: String,
        required: [true,"Please add information about the property"],
        maxlength: [500,"Description cannot exceed 500 characters"]
    },
    extraInfo: {
        type: String,
        default: "check in on time,good location,clean and tidy"
    },
    propertyType: {
        type: String,
        enum: ["apartment", "house", "villa", "Hostel", "flat","guest house","bungalow","resort"],
        required: [true, "Please select a property type"]
    },
    roomtype: {
        type: String,
        enum: ["single", "double", "triple", "quad", "queen", "king"],
        required: [true, "Please select a room type"]
    },
    maximumGuests: {
        type: Number,
        required: [true, "Please enter the maximum number of guests"]
    },
    amenities:[     // array of amenities
        {
            name:{
                type:String,
                enum:[
                    "Wifi",
                    "Kitchen",
                    "Ac",
                    "Washing Machine",
                    "TV",
                    "Pool",
                    "Free Parking",
                ]

            },
            icon:{
                type:String,
                required:true
            }
        }
    ],
    images: {  // array of images
        type:[
            {
                public_id: {
                    type: String

                },
                url: {
                    type: String,
                    required: true
                }

                    
            }
        ],
        validate:{  // validate that at least 6 images are uploaded
            validator:function(arr){
                return arr.length>=6;
            },
            message:"Please upload at least 6 images"
        }

    },
    price: {
        type: Number,
        required: [true, "Please enter the price per night"],
        default: 500
    },
    address: {
        area: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    currentBookings: [    // array of booking ids
        {
            bookingId: {    // the booking id of the booking
                type: mongoose.Schema.Types.ObjectId,
                ref: "Booking"
            },
            fromDate: {
                type: Date,
            },
            toDate: {
                type: Date,
            },
            userId: {   // the user who booked the property
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }

        }

    ],
    userId: {   // the user who created the property
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,  // the slug of the property name
    checkInTime: {
        type: String,
        default: "12:00 PM"
    },
    checkOutTime: {
        type: String,
        default: "11:00 AM"
    },
    
   

     
    
});
propertySchema.pre("save", function(){   // create slug from property name
    this.slug=slugify(this.propertyname,{lower:true});
    
});
propertySchema.pre("save", function(){   // convert city to lowercase and remove spaces
    this.address.city=this.address.city.toLowerCase().replaceAll(" ","");
   
});
//const Property=mongoose.model("Property",propertySchema);
const Property=mongoose.models.Property || mongoose.model("Property",propertySchema);  // create property model


export{Property};