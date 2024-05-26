// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const visitLocationSlice = createSlice({
//     name: "visitLocation",
//     initialState: {

//         visitLocationList: []
//     },
//     reducers: {

//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchVisitLocation.pending, (state, action) => {

//         })
//         builder.addCase(fetchVisitLocation.fulfilled, (state, action) => {
//             state.visitLocationList = action.payload
//         })
//     }
// })
// export const fetchVisitLocation = createAsyncThunk("visitLocation/fetchVisitLocation",
//     async () => {
//         let res = await fetch('https://contact-api-orcin.vercel.app/visitLocation')
//         let data = await res.json()
//         return data
//     }
// )
// export default visitLocationSlice