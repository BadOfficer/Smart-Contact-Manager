import React, { useEffect, useRef, useState } from 'react';
import type { NotificationType } from '../../../types/Notification';
import { Alert, AlertTitle, Slide } from '@mui/material';

interface Props {
  notification: NotificationType;
  onRemove: (id: NotificationType['id']) => void;
  delay?: number;
}

export const Notification = React.memo(({ notification, onRemove, delay = 2000 }: Props) => {
  const [open, setOpen] = useState(true);
  const removedRef = useRef(false);

  useEffect(() => {
    const timerId = setTimeout(() => setOpen(false), delay);

    return () => clearTimeout(timerId);
  }, [delay, notification.id]);

  const handleClose = () => setOpen(false);

  const handleExited = () => {
    if (removedRef.current) return;
    removedRef.current = true;
    onRemove(notification.id);
  };

  return (
    <Slide
      direction="left"
      in={open}
      appear
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 220, exit: 160 }}
      onExited={handleExited}
    >
      <Alert severity={notification.type} onClose={handleClose}>
        <AlertTitle>{notification.title}</AlertTitle>
        {notification.message}
      </Alert>
    </Slide>
  );
});
