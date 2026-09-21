import {propertyDetailsActions} from "./propertyDetails-slice";
import axiosInstance from "../../utils/axios.js";


//fetch deatails of one specific property using property id

//receive property id as parameter
//start loading
//call backend api
//wait for response
//get the property data 
//store deatails in redux
//if error store error in redux



export const getPropertyDetails = (id) => async (dispatch) => {
    try{
        dispatch(propertyDetailsActions.getListRequest());
        const response = await axiosInstance(`/v1/rent/listings/${id}`);
        console.log("response from backend", response.data);
        if(!response){
            throw new Error("could not fetch any propertyDetails");

        }
        const{data} = response.data;
        dispatch(propertyDetailsActions.getPropertyDetails(data));

    }catch(error){
        dispatch(propertyDetailsActions.getErrors(error.response.data.error));

    }

}