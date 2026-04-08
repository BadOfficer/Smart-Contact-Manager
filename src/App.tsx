import { useEffect } from 'react';
import {
  fetchContacts,
  removeContact,
  selectContacts,
  selectContactsError,
  selectContactsStatus
} from './features/contacts/contactsSlice';
import { useAppDispatch, useAppSelector } from './app/store';
import { ContactsList } from './components/ContactsList';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import type { UserType } from './types/User';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const contacts = useAppSelector(selectContacts);
  const contactsLoadingStatus = useAppSelector(selectContactsStatus);
  const contactsError = useAppSelector(selectContactsError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const handleRemoveContact = (id: UserType['id']) => {
    dispatch(removeContact(id));
  };

  const handleFetchContacts = () => {
    dispatch(fetchContacts());
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
      <Typography variant="h3" component="h1" sx={{ alignSelf: 'flex-start' }}>
        Smart Contacts Manager
      </Typography>

      {contactsLoadingStatus && <CircularProgress />}

      {contactsError && <ErrorMessage onRetry={handleFetchContacts}>{contactsError}</ErrorMessage>}

      <Box sx={{ width: '100%' }}>
        {!contactsLoadingStatus && !contactsError && (
          <ContactsList contacts={contacts} onRemoveCell={handleRemoveContact} />
        )}
      </Box>
    </Container>
  );
}

export default App;
