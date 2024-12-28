import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs:[],
        singlejob:{},  
        searchjob:"",
        alladminjobs:[],
        allappliedjobs:[],
        query:"",
        queryjobs:"",
    },
    reducers:{
        setalljobs:(state,action)=>{
            state.alljobs = action.payload
        },
        setsinglejob:(state,action)=>{
            state.singlejob = action.payload
        },
        setsearchjob:(state,action)=>{
            state.searchjob = action.payload
        },
        setalladminjobs:(state,action)=>{
            state.alladminjobs = action.payload
        },
        setallappliedjobs:(state,action)=>{
            state.allappliedjobs = action.payload
        },
        setquery:(state,action)=>{
            state.query = action.payload
        },
        setqueryjobs:(state,action)=>{
            state.queryjobs = action.payload
        }
    }
})

export const {setalljobs,setsinglejob,setsearchjob,setalladminjobs,setallappliedjobs,setquery,setqueryjobs} = jobSlice.actions;
export default jobSlice.reducer;
