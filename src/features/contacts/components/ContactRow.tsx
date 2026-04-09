import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import type { UserType } from '../../../types/User';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React from 'react';

interface Props {
  contact: UserType;
  onRemove: (id: UserType['id']) => void;
  onEdit: (contact: UserType) => void;
  onToggleFollow: (id: UserType['id']) => void;
  isFollowed: boolean;
}

export const ContactRow = React.memo(
  ({ contact, onRemove, onEdit, onToggleFollow, isFollowed }: Props) => {
    const { id, email, name, username } = contact;

    return (
      <TableRow>
        <TableCell sx={{ fontWeight: 500, textAlign: 'center' }}>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <IconButton onClick={() => onRemove(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onEdit(contact)}>
            <EditIcon />
          </IconButton>
          <Button
            onClick={() => onToggleFollow(id)}
            variant={isFollowed ? 'contained' : 'outlined'}
            sx={{
              width: '40px',
              height: '40px',
              minWidth: 0
            }}
          >
            {isFollowed ? <ThumbDownIcon /> : <ThumbUpIcon />}
          </Button>
        </TableCell>
      </TableRow>
    );
  }
);
