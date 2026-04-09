import { useCallback } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { removeNotification, selectNotifications, selectNotificationsDelay } from '../notificationsSlice';
import { Notification } from './Notification';
import type { NotificationType } from '../../../types/Notification';

export const NotificationContainer = () => {
  const notifications = useAppSelector(selectNotifications);
  const delay = useAppSelector(selectNotificationsDelay);

  const dispatch = useAppDispatch();

  const handleRemoveNotification = useCallback((id: NotificationType['id']) => {
    dispatch(removeNotification(id));
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 0,
        right: '16px',
        top: '16px',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {notifications.map((nt) => (
        <Notification key={nt.id} notification={nt} onRemove={handleRemoveNotification} delay={delay} />
      ))}
    </Box>
  );
};
