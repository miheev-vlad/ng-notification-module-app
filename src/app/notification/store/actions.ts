import { createAction, props } from '@ngrx/store';
import { INotification } from '../types/notification.interface';

export const connectServerStream = createAction(
  '[Notification] Connect to ServerStream'
);

export const connectServerStreamFailure = createAction(
  '[Notification] Connect to ServerStream failure'
);

export const disconnectServerStream = createAction(
  '[Notification] Disconnect to ServerStream'
);

export const addNotification = createAction(
  '[Notification] Add notification',
  props<{ notification: INotification }>()
);

export const clearNotifications = createAction(
  '[Notification] Clear notifications'
);

export const removeNotification = createAction(
  '[Notification] Remove notification',
  props<{ id: string }>()
);
