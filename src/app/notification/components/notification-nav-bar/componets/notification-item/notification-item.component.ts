import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as NotificationActions from '../../../../store/actions';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() message = '';
  @Input() timeDate = '';

  constructor(private store: Store<AppStateInterface>) {}

  public removeNotification() {
    this.store.dispatch(
      NotificationActions.removeNotification({ id: this.id })
    );
  }
}
