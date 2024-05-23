import { createSlice } from "@reduxjs/toolkit";
import { GrAction } from "react-icons/gr";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchText: '',
        maxPrice: '',
        rating: ''
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
        }

    }
})
export default filterSlice