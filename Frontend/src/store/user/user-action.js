import { userActions } from "./user-slice.js";
import axiosInstance from "../../utils/axios.js";

export const getSignup=(user)=> async(dispatch)=>{
    try{
        dispatch(userActions.getSignupRequest());
        const {data} = await axiosInstance.post("/v1/rent/user/signup",user);

        dispatch(userActions.getSignupDetails(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}

//login user
export const getLogin=(user)=> async(dispatch)=>{
    try{
        dispatch(userActions.getLoginRequest());
        const {data} = await axiosInstance.post("/v1/rent/user/login",user);
        dispatch(userActions.getLoginDetails(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}
//current user
export const getCurrentUser=()=> async(dispatch)=>{
    try{
        dispatch(userActions.getCurrentRequest());
        const {data} = await axiosInstance.get("/v1/rent/user/Me");
        dispatch(userActions.getCurrentUser(data.user));

    }catch(error){
        dispatch(userActions.getLogout(null));
    }

}
//update user
export const updateUser=(updateUser)=> async(dispatch)=>{
    try{
        dispatch(userActions.getUpdateRequest());
        const response = await axiosInstance.patch("/v1/rent/user/updateMe",updateUser);
        console.log(response);
        const{data}=await axiosInstance.get("/v1/rent/user/Me");
        dispatch(userActions.getCurrentUser(data.user));

    }catch(error){
        dispatch(userActions.getError(error.response.data.message));

    }
}
//Forgot password
export const forgotPassword=(email)=> async(dispatch)=>{
    try{
        await axiosInstance.post("/v1/rent/user/forgotPassword",{email});

    }catch(error){
        dispatch(userActions.getError(error.response.data.message));

    }
}
//Reset password
export const resetPassword=(token,repassword)=> async(dispatch)=>{
    try{
        await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`,repassword);

    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}
//update password
export const updatePassword=(passwords)=> async(dispatch)=>{
    try{
        dispatch(userActions.getPasswordRequest());
        const {data} = await axiosInstance.patch("/v1/rent/user/updateMyPassword",passwords);
        dispatch(userActions.getPasswordSuccess(true));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}
//logout user
export const getLogout=()=> async(dispatch)=>{
    try{
        await axiosInstance.get("/v1/rent/user/logout");
        dispatch(userActions.getLogout(null));

    }catch(error){
        dispatch(userActions.getError(error.response.data.message));

    }
};
