import { createSlice } from "@reduxjs/toolkit";
import { GrAction } from "react-icons/gr";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchText: '',
        maxPrice: 'tất cả',
        rating: 'tất cả',
        dataForBooking: {}
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
        }

    }
})
export default filterSlice