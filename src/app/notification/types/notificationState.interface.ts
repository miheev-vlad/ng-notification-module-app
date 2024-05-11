import { INotification } from './notification.interface';

export interface NotificationStateInterface {
  notifications: INotification[];
  serverStreamConnect: boolean;
}
