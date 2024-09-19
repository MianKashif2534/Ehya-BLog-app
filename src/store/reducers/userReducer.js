//reducer/userreducer/
import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

const userActions = userSlice.actions;
// export const {setUserInfo , resetUserInfo} = userSlice.actions;
const userReducers = userSlice.reducer;

export { userActions, userReducers };
