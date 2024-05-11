import { Component } from '@angular/core';
import { NotificationService } from 'src/app/notification/services/notification.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent {
  constructor(public notificationService: NotificationService) {}

  public toggleNotificationCenter() {
    this.notificationService.showNotificationCenter$.next(
      !this.notificationService.showNotificationCenter$.value
    );
  }
}
