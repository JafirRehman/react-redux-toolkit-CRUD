import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";

const store = configureStore({
  reducer: {
    ourslice: slices,
  },
  devTools: true,
});

export default store;
