import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerStreamService } from '../../services/server-stream.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Store } from '@ngrx/store';
import * as NotificationActions from '../../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private serverStreamService: ServerStreamService,
    private notificationService: NotificationService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.subscription = this.serverStreamService.connect().subscribe(
      (notification) => {
        this.store.dispatch(
          NotificationActions.addNotification({ notification })
        );
        this.notificationService.showNotification(
          notification.title,
          notification.message
        );
      },
      () =>
        this.store.dispatch(NotificationActions.connectServerStreamFailure())
    );
  }

  public stopReceivingNotifications() {
    this.subscription.unsubscribe();
    this.serverStreamService.close();
    this.store.dispatch(NotificationActions.disconnectServerStream());
  }

  ngOnDestroy() {
    this.stopReceivingNotifications();
  }
}
