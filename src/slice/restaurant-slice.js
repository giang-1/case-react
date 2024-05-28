import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: 'restaurantList',
    initialState: {
        isLoading: 'idle',
        restaurant: [],
        dataForEdit: {},
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
            const id = action.payload.id;
            if (id) {
                state.restaurant = state.restaurant.filter((item) => item.id !== id);
            }
        })


        builder.addCase(createRestaurantList.pending, (state, action) => {

        })
        builder.addCase(createRestaurantList.fulfilled, (state, action) => {
            state.restaurant.push(action.payload)
        })

        builder.addCase(editRestaurantList.pending, (state, action) => {
            state.isLoading = 'loading'
        })
        builder.addCase(editRestaurantList.fulfilled, (state, action) => {
            state.isLoading = 'idle'
            state.dataForEdit = action.payload
        })
        builder.addCase(handleEditRestaurantList.pending, (state, action) => {
            state.isLoading = 'loading'
        })
        builder.addCase(handleEditRestaurantList.fulfilled, (state, action) => {
            state.restaurant = state.restaurant.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
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
        let response = await fetch(
            `https://contact-api-orcin.vercel.app/restaurant/${id.id}`,
            {
                method: "DELETE",
            }
        )
        await response.json()
        return id
    }

)
export const createRestaurantList = createAsyncThunk('retaurantList/createRestaurantList',
    async (item) => {
        let res = await fetch('https://contact-api-orcin.vercel.app/restaurant', {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        })
        let data = await res.json()
        return data
    }
)
export const editRestaurantList = createAsyncThunk('restaurant/editRestaurantList',
    async (item) => {
        let res = await fetch(`https://contact-api-orcin.vercel.app/restaurant/${item.id}`)
        const data = await res.json()
        return data
    }
)
export const handleEditRestaurantList = createAsyncThunk('restaurant/handleEditRestaurantList',
    async (item) => {
        let res = await fetch(`https://contact-api-orcin.vercel.app/restaurant/${item.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        })
        let data = await res.json()
        return data
    }
)

export default restaurantSlice