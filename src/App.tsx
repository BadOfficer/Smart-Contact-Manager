import { useEffect } from 'react';
import {
  addContact,
  editContact,
  fetchWithNotification,
  selectContacts,
  selectContactsError,
  selectContactsStatus,
  selectEditingUser,
  setEditingUser
} from './features/contacts/contactsSlice';
import { useAppDispatch, useAppSelector } from './app/store';
import { ContactsList } from './features/contacts/components/ContactsList';
import { Box, CircularProgress, Container, Fab, Typography } from '@mui/material';
import type { UserType } from './types/User';
import { ErrorMessage } from './components/ErrorMessage';
import { NotificationContainer } from './features/notifications/components/NotificationContainer';

import AddIcon from '@mui/icons-material/Add';
import { useModal } from './hooks/useModal';
import { ContactForm } from './features/contacts/components/ContactForm';

function App() {
  const contacts = useAppSelector(selectContacts);
  const contactsLoadingStatus = useAppSelector(selectContactsStatus);
  const contactsError = useAppSelector(selectContactsError);
  const editingContact = useAppSelector(selectEditingUser);

  const { isOpen, open, close } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWithNotification());
  }, []);

  const handleFetchContacts = () => {
    dispatch(fetchWithNotification());
  };

  const onSubmitContactForm = (user: UserType) => {
    if (editingContact) {
      return dispatch(editContact(user));
    }

    return dispatch(addContact(user));
  };

  const onCancelContractForm = () => {
    if (editingContact) {
      return dispatch(setEditingUser(null));
    }

    close();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px'
      }}
    >
      <NotificationContainer />
      <Typography variant="h3" component="h1" sx={{ alignSelf: 'flex-start' }}>
        Smart Contacts Manager
      </Typography>

      {contactsLoadingStatus && <CircularProgress />}

      {contactsError && <ErrorMessage onRetry={handleFetchContacts}>{contactsError}</ErrorMessage>}

      <Box sx={{ width: '100%' }}>
        {!contactsLoadingStatus && !contactsError && <ContactsList contacts={contacts} />}
      </Box>

      <Fab
        component="button"
        sx={{
          position: 'absolute',
          bottom: '15px',
          right: '15px',
          borderRadius: '50%'
        }}
        color="primary"
        onClick={open}
      >
        <AddIcon />
      </Fab>

      {(isOpen || editingContact) && (
        <ContactForm
          isOpen={isOpen || Boolean(editingContact)}
          onClose={onCancelContractForm}
          onSubmit={(data: UserType) => onSubmitContactForm(data)}
          contact={editingContact}
        />
      )}
    </Container>
  );
}

export default App;
