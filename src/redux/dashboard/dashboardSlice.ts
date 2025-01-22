import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { inventoryData, STATUS } from "./services/inventory";
import { toast } from "sonner";

export interface Dashboard {
  user: "admin" | "user";
  data: inventoryData[];
  analytics: {
    totalProducts: number;
    storeValue: number;
    outOfStock: number;
    categories: number;
  };
}

const initialState: Dashboard = {
  user: "admin",
  data: [],
  analytics: {
    totalProducts: 0,
    storeValue: 0,
    outOfStock: 0,
    categories: 0,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<"admin" | "user">) => {
      state.user = action.payload;
    },
    gotData: (state, action: PayloadAction<inventoryData[]>) => {
      const _proccessedData = action.payload.map((product) => ({
        ...product,
        price: product.price.replace("$", ""),
        value: product.value.replace("$", ""),
        status: STATUS.active,
      }));
      state.data = _proccessedData;
      state.analytics = calculateAnalytics(_proccessedData);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const deleted = state.data[action.payload];
      const _proccessedData = state.data.filter(
        (_, index) => index !== action.payload
      );
      state.data = _proccessedData;
      state.analytics = calculateAnalytics(_proccessedData);
      toast.error(`${deleted.name} deleted`);
    },
    enableProduct: (state, action: PayloadAction<number>) => {
      let _proccessedData = state.data;
      _proccessedData[action.payload].status = STATUS.active;
      state.data = _proccessedData;
      state.analytics = calculateAnalytics(_proccessedData);
      toast.success(`${_proccessedData[action.payload].name} enabled`);
    },
    disableProduct: (state, action: PayloadAction<number>) => {
      let _proccessedData = state.data;
      _proccessedData[action.payload].status = STATUS.disabled;
      state.data = _proccessedData;
      state.analytics = calculateAnalytics(_proccessedData);
      toast.warning(`${_proccessedData[action.payload].name} disabled`);
    },
    editProduct: (
      state,
      action: PayloadAction<{ index: number; data: inventoryData }>
    ) => {
      let _data = state.data;
      _data[action.payload.index] = action.payload.data;
      state.data = _data;
      state.analytics = calculateAnalytics(_data);
      toast.success(`${action.payload.data.name} updated`);
    },
  },
});

export const {
  changeUser,
  gotData,
  deleteProduct,
  enableProduct,
  disableProduct,
  editProduct,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

const calculateAnalytics = (data: inventoryData[]) => {
  const totalProducts = data.reduce((total, product) => {
    return product.status === STATUS.active ? total + 1 : total;
  }, 0);
  const storeValue = data.reduce((total, product) => {
    const itemValue = Number(product.value) || 0;
    return product.status === STATUS.active ? total + itemValue : total;
  }, 0);

  const outOfStock = data.reduce((total, product) => {
    return product.quantity === 0 && product.status === STATUS.active
      ? total + 1
      : total;
  }, 0);

  const allCategories = new Set(
    data.map((product) => {
      return product.status === STATUS.active && product.category;
    })
  );
  const categories = allCategories.size;
  return { totalProducts, storeValue, outOfStock, categories };
};
