import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: []
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem = action.payload
            let checkCartItem = state.cartList.find((item) => item?.id === action.payload.id)
            if (checkCartItem) {
                alert('đã thêm vào cart')
            } else {
                state.cartList.push(newItem)
                alert('thêm vào cart thành công')
            }

        }
    }
})
export default cartSlice