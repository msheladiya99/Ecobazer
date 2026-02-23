import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./Slices/userAuthSlice";
import productSlices from "./Slices/productSlices";
import categorySlices from "./Slices/categorySlices";
import cartSlices from "./Slices/cartSlices";
import newsSlice from "./Slices/newsSlice";
import orderSlice from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    users: userAuthSlice,
    products: productSlices,
    categories: categorySlices,
    cartSlices: cartSlices,
    newsSlice: newsSlice,
    orders: orderSlice,
  },
});
