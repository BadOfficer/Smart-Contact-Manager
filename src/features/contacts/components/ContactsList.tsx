import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import type { UserType } from '../../../types/User';
import { useAppDispatch } from '../../../app/store';
import { removeContact, setEditingUser, toggleFollow } from '../contactsSlice';
import { useCallback, useMemo, useState } from 'react';
import { ContactRow } from './ContactRow';
import { blue } from '@mui/material/colors';

interface Props {
  contacts: UserType[];
  follows: UserType['id'][];
}

export const ContactsList = ({ contacts, follows }: Props) => {
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();

  const handleRemoveContact = (id: UserType['id']) => {
    dispatch(removeContact(id));
  };

  const handleEditContact = (contact: UserType) => {
    dispatch(setEditingUser(contact));
  };

  const handleToggleFollow = (userId: UserType['id']) => {
    dispatch(toggleFollow(userId));
  };

  const visibleRows = useMemo(() => contacts.slice(page * 10, page * 10 + 10), [contacts, page]);

  const isFollowed = useCallback((id: UserType['id']) => follows.includes(id), [follows]);

  if (contacts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity="info">Contacts is empty</Alert>
      </Box>
    );
  }

  return (
    <Paper>
      <TableContainer>
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
            {visibleRows.map((ct) => (
              <ContactRow
                key={ct.id}
                contact={ct}
                isFollowed={isFollowed(ct.id)}
                onEdit={handleEditContact}
                onRemove={handleRemoveContact}
                onToggleFollow={handleToggleFollow}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={contacts.length}
        rowsPerPage={10}
        onPageChange={(_, newPage: number) => setPage(newPage)}
        page={page}
      />
    </Paper>
  );
};
