import { createSlice } from "@reduxjs/toolkit";
import { GrAction } from "react-icons/gr";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchText: '',
        maxPrice: 'tất cả',
        rating: 'tất cả',
        oderListSearch: '',
        oderListSort: '',
        oderSearchMounth: '',
        dataForBooking: {},


    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        },
        setRating: (state, action) => {
            state.rating = action.payload
        },
        setDataForBooking: (state, action) => {
            state.dataForBooking = action.payload
        },
        setOderListSearch: (state, action) => {
            state.oderListSearch = action.payload
            // console.log(action.payload)
        },
        setOderListFill: (state, action) => {
            state.oderListSort = action.payload
        },
        setOderSearchMounth: (state, action) => {
            state.oderSearchMounth = action.payload
        }

    }
})
export default filterSlice