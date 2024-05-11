import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationNavBarComponent } from './components/notification-nav-bar/notification-nav-bar.component';
import { NotificationBellComponent } from './components/notification-nav-bar/componets/notification-bell/notification-bell.component';
import { NotificationCenterComponent } from './components/notification-nav-bar/componets/notification-center/notification-center.component';
import { NotificationItemComponent } from './components/notification-nav-bar/componets/notification-item/notification-item.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';
import { LimitToFourNodeDirective } from './pipes/LimitToFourNode.directive';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    NotificationNavBarComponent,
    NotificationBellComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
    NotificationContainerComponent,
    LimitToFourNodeDirective,
    NotificationComponent,
  ],
  exports: [NotificationComponent],
  imports: [CommonModule],
})
export class NotificationModule {}
