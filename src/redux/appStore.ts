import { configureStore } from "@reduxjs/toolkit";
import { dashboardSlice } from "./dashboard/dashboardSlice";
import { inventoryApi } from "./dashboard/services/inventory";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
