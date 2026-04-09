import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationType } from '../../types/Notification';
import type { RootState } from '../../app/store';

interface InitialNotificationsStateType {
  notifications: NotificationType[];
  delay: number;
}

const initialNotificationState: InitialNotificationsStateType = {
  notifications: [],
  delay: 2000
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state, action: PayloadAction<NotificationType['id']>) => {
      state.notifications = state.notifications.filter((nt) => nt.id !== action.payload);
    }
  }
});

export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectNotificationsDelay = (state: RootState) => state.notifications.delay;

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
