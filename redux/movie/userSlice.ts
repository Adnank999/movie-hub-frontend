import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 

interface UserState {
  user: {
    id: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
