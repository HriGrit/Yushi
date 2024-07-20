import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageState {
  id: string | null;
  email: string | null;
  name: string | null;
  profile: string | null;
}

const initialState: MessageState = {
  id: null,
  email: null,
  name: null,
  profile: null,
};

const msgSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setId(state, action: PayloadAction<MessageState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
    },
    clearId(state) {
      state.id = null;
      state.email = null;
      state.name = null;
      state.profile = null;
    },
  },
});

export const { setId, clearId } = msgSlice.actions;
export default msgSlice.reducer;