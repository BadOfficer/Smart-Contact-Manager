import { useEffect, useMemo, useState } from 'react';
import {
  addContact,
  editContact,
  fetchWithNotification,
  selectContacts,
  selectContactsError,
  selectContactsStatus,
  selectEditingUser,
  selectFollows,
  setEditingUser
} from './features/contacts/contactsSlice';
import { useAppDispatch, useAppSelector } from './app/store';
import { ContactsList } from './features/contacts/components/ContactsList';
import { Box, CircularProgress, Container, Fab } from '@mui/material';
import type { UserType } from './types/User';
import { ErrorMessage } from './components/ErrorMessage';
import { NotificationContainer } from './features/notifications/components/NotificationContainer';

import AddIcon from '@mui/icons-material/Add';
import { useModal } from './hooks/useModal';
import { ContactForm } from './features/contacts/components/ContactForm';
import { Header } from './components/Header';
import { prepareContactsHelper } from './helpers/prepareContactsHelper';

function App() {
  const contacts = useAppSelector(selectContacts);
  const contactsLoadingStatus = useAppSelector(selectContactsStatus);
  const contactsError = useAppSelector(selectContactsError);
  const editingContact = useAppSelector(selectEditingUser);
  const follows = useAppSelector(selectFollows);

  const { isOpen, open, close } = useModal();
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWithNotification());
  }, []);

  const preparedContacts = useMemo(() => {
    return prepareContactsHelper(contacts, { query });
  }, [contacts, query]);

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
      <Header query={query} setQuery={setQuery} disabled={contacts.length === 0} />

      {contactsLoadingStatus && <CircularProgress />}

      {contactsError && <ErrorMessage onRetry={handleFetchContacts}>{contactsError}</ErrorMessage>}

      <Box sx={{ width: '100%' }}>
        {!contactsLoadingStatus && !contactsError && (
          <ContactsList contacts={preparedContacts} follows={follows} />
        )}
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
          onClose={close}
          onSubmit={(data: UserType) => onSubmitContactForm(data)}
          contact={editingContact}
          onCancel={onCancelContractForm}
        />
      )}
    </Container>
  );
}

export default App;
