import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: [],
        loginRoll: false,
        cartOderList: [],
        bookingCart: []
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
        },
        removeListCart: (state, action) => {
            state.cartList = state.cartList?.filter((item) => item.id !== action.payload.id)
        },
        setBookingCart: (state, action) => {
            state.bookingCart = [...state.bookingCart,
            action.payload
            ]
            console.log(action.payload)
            // console.log(state.bookingCart)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOderList.pending, (state, action) => {
            return state
        })
        builder.addCase(fetchOderList.fulfilled, (state, action) => {
            state.cartOderList = action.payload
        })
        builder.addCase(removeOderListItem.fulfilled, (state, action) => {
            state.cartOderList = state.cartOderList.filter((item) => item.id !== action.payload.id)
        })
    }

})
export const removeOderListItem = createAsyncThunk('cart/removeOderListItem',
    async (item) => {
        let res = await fetch(`https://contact-api-orcin.vercel.app/customerInfor/${item.id}`, {
            method: 'DELETE'
        })
        return item
    }
)
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