import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/notification/services/notification.service';
import {
  notificationsCountSelector,
  notificationsSelector,
} from 'src/app/notification/store/selectors';
import { INotification } from 'src/app/notification/types/notification.interface';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as NotificationActions from '../../../../store/actions';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent {
  public notifications$: Observable<INotification[]>;
  public notificationsLength$: Observable<number>;

  constructor(
    private store: Store<AppStateInterface>,
    public notificationService: NotificationService
  ) {
    this.notifications$ = this.store.pipe(select(notificationsSelector));
    this.notificationsLength$ = this.store.pipe(
      select(notificationsCountSelector)
    );
  }

  public clearNotifications() {
    this.store.dispatch(NotificationActions.clearNotifications());
  }
}
