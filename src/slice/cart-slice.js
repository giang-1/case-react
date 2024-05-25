import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: [],
        loginRoll: false,
        cartOderList: []
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

        },
        handleLoginRoll: (state, action) => {
            state.loginRoll = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOderList.pending, (state, action) => {
            return state
        })
        builder.addCase(fetchOderList.fulfilled, (state, action) => {
            state.cartOderList = action.payload
        })
    }

})
export const handleSubmitCustomerInfo = createAsyncThunk('cart/handleSubmitCustomerInfo',
    async (item) => {
        let res = await fetch('https://contact-api-orcin.vercel.app/customerInfor', {

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
export const fetchOderList = createAsyncThunk('cart/fetchOderList',
    async () => {
        let res = await fetch('https://contact-api-orcin.vercel.app/customerInfor')
        let data = await res.json()
        return data
    }
)
export default cartSlice