import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utilis/db.js";
import {router} from "./routes/userRoutes.js";
import imagekitIO from "./utilis/ImagekitIO.js";
import {propertyRouter} from "./routes/propertyRoutes.js";
import {bookingRouter} from "./routes/bookingRoutes.js";
import {tripRouter} from "./routes/tripRoter.js";



dotenv.config();

const app=express();
// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({limit:"100mb"}));

// urlencoded is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({limit:"100mb",extended:true}));

// cookie-parser is a middleware which parses cookies attached to the client request object. It populates the req.cookies with an object keyed by the cookie names.

app.use(cookieParser());
app.use(cors({
    
    origin:process.env.ORIGIN_ACCESS_URL,  // The origin option specifies the allowed origin for cross-origin requests. It is set to the value of the ORIGIN_ACCESS_URL environment variable, which should be the URL of the frontend application that is allowed to make requests to this backend server.
    credentials:true
}))
const port=process.env.port;

// one test route
app.get("/",(req,res)=>{
    res.send("HomelyHub server is running")
})

// common url we kept in index.js file and we will use it in userRoutes.js file
app.use("/api/v1/rent/user",router);
// propertyRouter is used to handle requests related to property listings. It is mounted on the /api/v1/rent/listings path, meaning that any requests to this path will be handled by the propertyRouter.
app.use("/api/v1/rent/listings",propertyRouter);
app.use("/api/v1/rent/user/bookings",bookingRouter);  // bookingRouter is used to handle requests related to bookings. It is mounted on the /api/v1/rent/bookings path, meaning that any requests to this path will be handled by the bookingRouter.
app.use("/api/v1/rent/trip",tripRouter);  // tripRouter is used to handle requests related to trip planning. It is mounted on the /api/v1/rent/trip path, meaning that any requests to this path will be handled by the tripRouter.
connectDB(); //connectDB() is a function that establishes a connection to the database. It is called here to ensure that the application can interact with the database before handling any incoming requests.
app.listen(port,()=>{
    console.log(`app is running on port no:${port}`)
});
