import { UPDATE_ONE_STOCK, UPDATE_ONE_STOCK_QTY, UPDATE_STOCKS } from "./ActionType";
import { updateOneStock, updateStockQty } from "./ReducerAction";

const initialState = {
  stockData: []
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STOCKS: {
      return {
        ...state,
        stockData: [...state.stockData, ...action.payload],
      };
    }
    case UPDATE_ONE_STOCK: {
        return{
            ...state,
            stockData: updateOneStock(state.stockData, action.payload)
        }
    }    
    case UPDATE_ONE_STOCK_QTY: {
        return{
            ...state,
            stockData: updateStockQty(state.stockData, action.payload)
        }
    }
    default:
      return state;
  }
};

export default dashboardReducer;
