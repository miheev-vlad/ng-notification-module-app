import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { notificationsCountSelector } from 'src/app/notification/store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent {
  public notificationsCount$: Observable<number>;

  constructor(
    public notificationService: NotificationService,
    private store: Store<AppStateInterface>
  ) {
    this.notificationsCount$ = this.store.pipe(
      select(notificationsCountSelector)
    );
  }

  public toggleNotificationCenter() {
    this.notificationService.showNotificationCenter$.next(
      !this.notificationService.showNotificationCenter$.value
    );
  }
}
