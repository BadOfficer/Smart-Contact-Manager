import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../types/User';
import type { RootState } from '../../app/store';

interface InitialStateType {
  items: UserType[];
  isLoading: boolean;
  error: null | string;
}

const initialState: InitialStateType = {
  items: [],
  isLoading: false,
  error: null
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    (builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      }),
      builder.addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error?.message || 'Unknown error';
        state.isLoading = false;
      }));
  }
});

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('Users fetching failed');
    }

    return response.json();
  } catch (e) {
    console.error(e);
  }
});

export const {} = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.items;

export default contactsSlice.reducer;
