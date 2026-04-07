import { Alert, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { UserType } from '../types/User';

import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

interface Props {
  contacts: UserType[];
  onRemoveCell: (id: UserType['id']) => void;
}

export const ContactsList = ({ contacts, onRemoveCell }: Props) => {
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
              <IconButton onClick={() => onRemoveCell(ct.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
