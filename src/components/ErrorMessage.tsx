import { Alert, Box, Button } from '@mui/material';
import type React from 'react';

interface Props {
  onRetry?: () => void;
  children: React.ReactNode;
}

export const ErrorMessage = ({ children, onRetry = () => {} }: Props) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Alert severity="error">{children}</Alert>
      <Button onClick={onRetry} variant="contained" color="error" sx={{ marginTop: '16px' }}>
        Try Again
      </Button>
    </Box>
  );
};
