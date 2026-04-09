import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import contactsReducer, {
  addContact,
  editContact,
  removeContact
} from '../features/contacts/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import notificationsReducer, {
  addNotification
} from '../features/notifications/notificationsSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addContact, removeContact, editContact),
  effect: (action, listenerApi) => {
    let message;

    switch (action.type) {
      case 'contacts/addContact':
        message = 'Contact added succesfully';
        break;
      case 'contacts/removeContact':
        message = 'Contact removed succesfully';
        break;
      case 'contacts/editContact':
        message = 'Contact updated succesfully';
        break;
      default:
        message = 'Action succesfull';
    }

    listenerApi.dispatch(
      addNotification({
        id: Date.now(),
        message,
        title: 'Success',
        type: 'success'
      })
    );
  }
});

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    notifications: notificationsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
