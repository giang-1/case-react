import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: 'restaurantList',
    initialState: {
        isLoading: 'idle',
        restaurant: [],
        dataForEdit: {}
    },
    reducers: {
        takeDataForEdit: (state, action) => {
            state.dataForEdit = action.payload

        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurantList.pending, (state, action) => {
            state.isLoading = 'loading'
        })
        builder.addCase(fetchRestaurantList.fulfilled, (state, action) => {
            state.restaurant = action.payload
            state.isLoading = 'idle'
        })
        builder.addCase(removeRestaurantList.pending, (state, action) => {
            state.isLoading = 'loading'
        })
        builder.addCase(removeRestaurantList.fulfilled, (state, action) => {
            state.isLoading = 'idle'
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter((el) => el.id !== id);
            }
        })
    }
})
export const fetchRestaurantList = createAsyncThunk('restaurantList/fetchRestaurantList',
    async () => {
        let res = await fetch('https://contact-api-orcin.vercel.app/restaurant')
        let data = await res.json()
        return data
    }
)
export const removeRestaurantList = createAsyncThunk('restaurantList/removeRestaurantList',
    async (id) => {
        const response = await fetch(
            `https://contact-api-orcin.vercel.app/restaurant/${id.id}`,
            {
                method: "DELETE",
            }
        )
        let data = await response.json()
        return data
    }

)

export default restaurantSlice