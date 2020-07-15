import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (
      state,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      console.log('*****ollaan reducerissa', payload);

      return state;
    },
  },
});

export const { signUp } = authSlice.actions;

export default authSlice.reducer;
