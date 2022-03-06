import { combineReducers } from "redux";
import dashboardReducer from "./dashboard/Reducer";
const RootReducer = combineReducers({
    dashboard: dashboardReducer,

  });

  export default RootReducer