import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:"application",
    initialState:{
        applicants:[]
    },
    reducers:{
        setapplicants:(state,action)=>{
            state.applicants = action.payload
        }
    }
})

export const {setapplicants} = applicationSlice.actions
export default applicationSlice.reducer
