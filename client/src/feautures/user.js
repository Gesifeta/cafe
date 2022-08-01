import { useState } from "react";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const requestData={
  query:`
  query{
    userByEmail(email:"adamgemechu@gmail.com"){
      firstName
      email
      isAdmin
    }
  }
  `
}

export const userData=createAsyncThunk('user/userData',async()=>{

   return await fetch('http://localhost:5000/graphql', {
method:'POST',
body:JSON.stringify(requestData),
headers:{'Content-Type':'application/json'}}).then(res=>{
if(res.status!==200 && res.status!==1){
  throw new Error('Failed');
} return res.json();}).then(resData=>console.log((resData)));
})
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
    status:null
  },
  extraReducers:{
    [userData.pending]:(state,action)=>{
        state.status="Pending"
    },
    [userData.fulfilled]:(state,{payload})=>{
      state.status="success"
      state.value=payload
                },
    [userData.rejected]:(state,action)=>{
      state.status="Failed"
        return action.payload
    }
  }
});

  export default userSlice.reducer;