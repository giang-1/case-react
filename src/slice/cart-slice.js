import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: []
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem = action.payload
            state.cartList.push(newItem)
        }
    }
})
export default cartSlice