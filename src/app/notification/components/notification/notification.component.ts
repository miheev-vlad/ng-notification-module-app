import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerStreamService } from '../../services/server-stream.service';
import { Subscription } from 'rxjs';
import { INotification } from '../../types/notification.interface';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private serverStreamService: ServerStreamService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.serverStreamService
      .connect()
      .subscribe((notification) => {
        this.notificationService.pushNotifications(notification);
        this.notificationService.showNotification(
          notification.title,
          notification.message
        );
      });
  }

  public stopReceivingNotifications() {
    this.subscription.unsubscribe();
    this.serverStreamService.close();
  }

  ngOnDestroy() {
    this.stopReceivingNotifications();
  }
}
