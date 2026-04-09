export interface NotificationType {
  id: number;
  title: string;
  type: 'success' | 'error';
  message: string;
}
