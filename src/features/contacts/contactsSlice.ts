import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../../types/User';
import type { AppDispatch, RootState } from '../../app/store';
import { addNotification } from '../notifications/notificationsSlice';

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

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Users fetching failed');
  }

  return response.json();
});

export const fetchWithNotification = () => async (dispatch: AppDispatch) => {
  try {
    await dispatch(fetchContacts()).unwrap();

    dispatch(
      addNotification({
        id: Date.now(),
        title: 'Success',
        message: 'Fetching success',
        type: 'success'
      })
    );
  } catch (e: any) {
    dispatch(
      addNotification({
        id: Date.now(),
        title: 'Something went wrong',
        message: e?.message || 'Fething failed',
        type: 'error'
      })
    );
  }
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
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.error = action.error?.message || 'Unknown error';
      state.isLoading = false;
    });
  }
});

export const { addContact, removeContact } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectContactsStatus = (state: RootState) => state.contacts.isLoading;
export const selectContactsError = (state: RootState) => state.contacts.error;

export default contactsSlice.reducer;
