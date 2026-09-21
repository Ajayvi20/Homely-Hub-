// state manager
// all list of properties will be stored here
// count
// search filters
//loading flag
// error 
import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name: "property",
    initialState: {
        properties: [],
        totalProperties: 0,
        searchParams: {},
        loading: false,
        error: null
    },
    reducers: {
        // Define your reducers here
        getRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getProperties(state, action) {
           
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_Properties;
            state.loading = false; //request completed
            state.error = null;

        },
        updateSearchParms:(state, action)=> {
            state.searchParams = Object.keys(action.payload).length === 0 ? {} : {
                ...state.searchParams,
                ...action.payload
            }
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }


    },
})
export const propertyActions = propertySlice.actions;
export default propertySlice;
