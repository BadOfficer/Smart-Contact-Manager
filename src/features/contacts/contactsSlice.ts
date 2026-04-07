import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    addContact: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    },

    removeContact: (state, action: PayloadAction<UserType['id']>) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    }
  },

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

export const { addContact, removeContact } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectContactsStatus = (state: RootState) => state.contacts.isLoading;
export const selectContactsError = (state: RootState) => state.contacts.error;

export default contactsSlice.reducer;
