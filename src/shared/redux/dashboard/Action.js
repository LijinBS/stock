import {
  UPDATE_ONE_STOCK,
  UPDATE_ONE_STOCK_QTY,
  UPDATE_STOCKS,
} from "./ActionType.js";

export const updateStocks = (data) => {
  return {
    type: UPDATE_STOCKS,
    payload: data,
  };
};

export const updateOneStock = (data) => {
  return {
    type: UPDATE_ONE_STOCK,
    payload: data,
  };
};

export const updateStockQty = ({ Symbol, qty, lastUpdated }) => {
  console.log("inside action", { Symbol, qty, lastUpdated });
  return {
    type: UPDATE_ONE_STOCK_QTY,
    payload: {
      qty,
      Symbol,
      lastUpdated,
    },
  };
};
