import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  interests: [
    { id: '1', value: 'interest1' },
    { id: '2', value: 'interest2' },
    { id: '3', value: 'interest3' },
  ],
};

type Interest = {
  id: string;
  value: string;
};
const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {
    create: {
      reducer: (state, { payload }: PayloadAction<Interest>) => {
        state.interests.push(payload);
      },
      prepare: ({ value }: { value: string }) => ({
        payload: {
          id: value,
          value,
        },
      }),
    },
    edit: (state, { payload }: PayloadAction<Interest>) => {
      const interesToEdit = state.interests.find(
        (interest) => interest.id === payload.id
      );
      if (interesToEdit) {
        interesToEdit.value = payload.value;
      }
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.interests.findIndex(
        (interest) => interest.id === payload.id
      );
      if (index !== -1) {
        state.interests.splice(index, 1);
      }
    },
  },
});

export const {
  create: createInterest,
  edit: editInterest,
  remove: removeInterest,
} = interestsSlice.actions;

export default interestsSlice.reducer;
