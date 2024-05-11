import { Component } from '@angular/core';
import { NotificationService } from 'src/app/notification/services/notification.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent {
  constructor(public notificationService: NotificationService) {}

  public clearNotifications() {}
}
