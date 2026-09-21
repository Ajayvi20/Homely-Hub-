// receive the user's information about the trip and call the Groq API to get a trip plan
//validate the requuired information
//send the information to out Ai trip planner module
//calculate the budget per night
//seach mongodb for suitable properties
//send both AI trip plan+matching properties back to the frontend/user



import {Property} from "../Models/propertyModel.js";
import {planTrip} from "../ai/tripPlanner.js";
import {generateDescription} from "../ai/generateDescription.js";



const cleanCity=(text)=>text.toLowerCase().replaceAll(" ","");  // clean the city name to match the property model

const createTripPlan=async(req,res)=>{
    try{
        const {destination,budget,days,people,interests}=req.body;
        if(!destination || !budget || !days || !people || !interests){
            return res.status(400).json({
                status:"fail",
                message:"please fill in destination,budget,days,people and interests"
            });
        }
        const plan =await planTrip({
            destination,
            budget,
            days,
            people,
            interests: interests||[]
        });

        const perNight = Number(budget)/Number(days);  // calculate the budget per night
        const city=cleanCity(destination);  // clean the city name to match the property model

        const properties=await Property.find({
            $or:[
                {"address.city":city,},
                {"address.state":city},
                {"address.area":city}
            ],
            price:{$lte:perNight}, // find properties within the budget per night
            maximumGuest:{$gte:Number(people)} // find properties that can accommodate the number of people
        }).limit(6);  // limit to 6 properties
        res.status(200).json({
            status:"success",
            data:{plan,properties,perNight}

            
        })
        





    }catch(error){
        res.status(500).json({
            status:"fail",
            message:"could not create trip plan, please try again",
        })
    }

}  

const writeDescription=async(req,res)=>{
    try{
        const description=await generateDescription(req.body);
    res.status(200).json({
        status:"success",
        data:{description}
    })
    }catch(error){
        res.status(500).json({
            status:"fail",
            message:"could not generate description, please try again",
        })
            
        

    }

   
    
}
export {createTripPlan,writeDescription};
    

