import express from "express";
import {getProperties} from "../Controllers/propertyController.js";
import {getProperty} from "../Controllers/propertyController.js";
import e from "express";



const propertyRouter=express.Router();
propertyRouter.route("/").get(getProperties);  //defines a route for the root path ("/") of the propertyRouter. When a GET request is made to this path, the getProperties function from the propertyController.js file is called to handle the request and send back a response.
propertyRouter.route("/:id").get(getProperty); 


//exports the propertyRouter so that it can be used in other parts of the application, such as in the main server file where it is imported and used to handle requests to the /properties endpoint.
export {propertyRouter};  

