import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../types/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: INotification[] = [];
  public showNotificationCenter$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get notification() {
    return this.notification$.asObservable();
  }

  get notificationsLength(): number {
    return this.notifications.length;
  }

  constructor() {}

  private notification$: BehaviorSubject<INotification | null> =
    new BehaviorSubject<INotification | null>(null);

  public showNotification(
    title: string,
    message: string,
    timeDate: string = new Date().toISOString(),
    duration: number = 5000
  ) {
    this.notify(title, message, timeDate, duration);
  }

  private notify(
    title: string,
    message: string,
    timeDate: string,
    duration: number
  ) {
    this.notification$.next({
      title: title,
      message: message,
      timeDate: timeDate,
      duration: duration,
    } as INotification);
  }

  public pushNotifications(notification: INotification) {
    this.notifications.push({
      ...notification,
      timeDate: notification.timeDate
        ? notification.timeDate
        : new Date().toISOString(),
    });
  }
}
