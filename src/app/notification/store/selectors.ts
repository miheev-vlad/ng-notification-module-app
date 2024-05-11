import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { NotificationStateInterface } from '../types/notificationState.interface';

export const selectFeature = (state: AppStateInterface) => state.notification;

export const notificationsSelector = createSelector(
  selectFeature,
  (state: NotificationStateInterface) => state.notifications
);

export const notificationsCountSelector = createSelector(
  selectFeature,
  (state: NotificationStateInterface) => state.notifications.length
);
