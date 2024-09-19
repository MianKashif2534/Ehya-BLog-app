//index
import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./reducers/userReducer";

const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialStage = {
  user: { userInfo: userInfoFromStorage },
};
const store = configureStore({
  reducer: { user: userReducers },
  preloadedState: initialStage,
});

export default store;
