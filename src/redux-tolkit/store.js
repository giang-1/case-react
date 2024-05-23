import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../slice/restaurant-slice";
import cartSlice from "../slice/cart-slice";
import visitLocationSlice from "../slice/visitLocation-slice";
import filterSlice from "../slice/fillter-slice";

const store = configureStore({
    reducer: {
        restaurantList: restaurantSlice.reducer,
        cartListRestaurant: cartSlice.reducer,
        visitLocation: visitLocationSlice.reducer,
        filterList: filterSlice.reducer

    }
})
export default store