import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
// ...import other reducers...

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    // ...other reducers...
  },
});

export default store;