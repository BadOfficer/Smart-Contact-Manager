import { Alert, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { UserType } from '../../../types/User';

import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../app/store';
import { removeContact, setEditingUser } from '../contactsSlice';

interface Props {
  contacts: UserType[];
}

export const ContactsList = ({ contacts }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemoveContact = (id: UserType['id']) => {
    dispatch(removeContact(id));
  };

  const handleEditContact = (contact: UserType) => {
    dispatch(setEditingUser(contact));
  };

  if (contacts.length === 0) {
    return <Alert severity="info">Contacts is empty</Alert>;
  }

  return (
    <Table sx={{ borderRadius: '10px', overflow: 'hidden' }}>
      <TableHead
        sx={{
          '& .MuiTableCell-head': {
            backgroundColor: blue.A400,
            color: blue[50]
          }
        }}
      >
        <TableRow>
          <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((ct) => (
          <TableRow key={ct.id}>
            <TableCell sx={{ fontWeight: 500, textAlign: 'center' }}>{ct.id}</TableCell>
            <TableCell>{ct.name}</TableCell>
            <TableCell>{ct.username}</TableCell>
            <TableCell>{ct.email}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
              <IconButton onClick={() => handleRemoveContact(ct.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleEditContact(ct)}>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
