import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, TextField, Typography, type SxProps } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { contactSchema } from '../schema/contactSchema';
import type { UserType } from '../../../types/User';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contact: UserType | null;
  onSubmit: (contact: UserType) => void;
}

const styles: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  width: 600,
  p: 4
};

export const ContactForm = ({ isOpen, onClose, contact, onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: contact?.name || '',
      email: contact?.email || '',
      username: contact?.username || ''
    }
  });

  const submit = (data: Omit<UserType, 'id'>) => {
    onSubmit({
      id: contact?.id || Date.now(),
      name: data.name,
      email: data.email,
      username: data.username
    });

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={styles}>
        <Typography component="h2" variant="h4">
          Contact form
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              mt: '16px'
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  size="small"
                  label="Name"
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                  size="small"
                  label="Username"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  size="small"
                  label="Email"
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '16px',
              gap: 2
            }}
          >
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button type="reset" onClick={onClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
