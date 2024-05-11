import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() timeDate = '';

  public removeNotification() {}
}
