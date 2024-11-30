import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectedUser } from "../../interface/dataTransfertObject";

interface UserState {
  value: null | ConnectedUser;
}

const initialState: UserState = {
  value: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ConnectedUser>) => {
      state.value = action.payload;
    },
    clearUser: () => initialState
  },
});
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer;