import {propertyActions} from "./property-slice.js";
import {axiosInstance} from "../../utils/axios.js";

//get all the properties
//1.start api request
//2.tell redux loading started
//3.get search parameters
//4.call backend api
//5.wait for response
//6.get property data
//7.send data to redux store
//8. if error => send error to redux 


//dispatch is used to send actions to the Redux store, allowing you to update the state based on the results of the API call. getState is used to access the current state of the Redux store, which can be useful for retrieving search parameters or other relevant data needed for the API request.
//getstate is used to access the current state of the Redux store, which can be useful for retrieving search parameters or other relevant data needed for the API request.
export const getAllProperties=(page=1)=> async(dispatch,getState)=>{
    try{
        console.log("API call started");

        dispatch(propertyActions.getRequest()); //tell redux loading started

        const {searchParams}=getState().properties; //get search parameters

        console.log(searchParams);

        const response=await axiosInstance.get(`/v1/rent/listings`,{
            params:{
                
                ...searchParams,
                page:page,
                limit:8
            }
        }); //call backend api

        if(!response){
            throw new Error("No response from server");
        }
        const {data}=response; //get property data

        console.log("data",data);

        dispatch(propertyActions.getProperties(data)); //send data to redux store



    }catch(error){
        dispatch(propertyActions.getError(error.message)); // if error => send error to redux
        
    }

}
