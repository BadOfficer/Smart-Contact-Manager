import { useEffect } from 'react';
import { fetchContacts, selectContacts } from './features/contacts/contactsSlice';
import { useAppDispatch, useAppSelector } from './app/store';

function App() {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  return <div>Smart contact manager</div>;
}

export default App;
