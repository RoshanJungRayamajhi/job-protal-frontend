import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singlecompany: null,
        // admincompany haiii
        allcompanies:[],
        searchcompany:null,
    },
    reducers: {
        setsinglecompany: (state, action) => {
            state.singlecompany = action.payload
        },
        setallcompanies:(state,action)=>{
            state.allcompanies = action.payload;
        },
        setsearchcompany:(state,action)=>{
            state.searchcompany = action.payload;
        }
    }
})

export const { setsinglecompany,setallcompanies,setsearchcompany } = companySlice.actions
export default companySlice.reducer
