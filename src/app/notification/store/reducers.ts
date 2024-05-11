import { createReducer, on } from '@ngrx/store';
import { NotificationStateInterface } from '../types/notificationState.interface';
import * as NotificationActions from './actions';

export const initialState: NotificationStateInterface = {
  notifications: [],
  serverStreamConnect: false,
};

export const reducers = createReducer(
  initialState,
  on(NotificationActions.connectServerStream, (state) => ({
    ...state,
    serverStreamConnect: true,
  })),
  on(NotificationActions.disconnectServerStream, (state) => ({
    ...state,
    serverStreamConnect: false,
  })),
  on(NotificationActions.connectServerStreamFailure, (state) => ({
    ...state,
    serverStreamConnect: false,
  })),
  on(NotificationActions.addNotification, (state, payload) => ({
    ...state,
    notifications: [...state.notifications, payload.notification],
  })),
  on(NotificationActions.clearNotifications, (state) => ({
    ...state,
    notifications: [],
  })),
  on(NotificationActions.removeNotification, (state, payload) => ({
    ...state,
    notifications: state.notifications.filter(
      (notification) => notification.id !== payload.id
    ),
  }))
);
