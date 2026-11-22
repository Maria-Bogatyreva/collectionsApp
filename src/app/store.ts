import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/collectionsApi.ts";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)

})

export default store