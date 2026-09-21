// propertyDetails

//create a slice name
//create initial state
//request starts
//property data received
//error occurs
//export Actions
//export slice

import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name: "propertyDetails",
    initialState: {
        propertyDetails: null,
        Loading: false,
        error: null,
    },
    reducers: {
        getListRequest: (state) => {
            state.Loading = true;
        },
        getPropertyDetails: (state, action) => {
            state.Loading = false;
            state.propertyDetails = action.payload;
        },
        getErrors: (state, action) => {
            state.Loading = false;
            state.error = action.payload;
        }
    },
})
export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;
