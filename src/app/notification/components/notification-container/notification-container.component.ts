import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeWhile } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { INotification } from '../../types/notification.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],
  providers: [DatePipe],
})
export class NotificationContainerComponent implements OnInit {
  private subscribed: boolean = true;

  @ViewChild('notificationContainer') container!: ElementRef<HTMLDivElement>;

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.notificationService.notification
      .pipe(takeWhile(() => this.subscribed))
      .subscribe((notification) => {
        if (notification) this.render(notification);
      });
  }

  ngOnDestroy() {
    this.subscribed = false;
  }

  private render(notification: INotification) {
    const notificationBox = this.renderer.createElement('div');
    const button = this.renderer.createElement('button');
    this.renderer.appendChild(button, this.renderer.createText('x'));
    this.renderer.listen(button, 'click', () => {
      this.renderer.removeClass(notificationBox, 'slide-in-from-bottom');
      this.renderer.addClass(notificationBox, 'deleted');
      setTimeout(() => {
        this.closeElement(notificationBox);
      }, 500);
    });

    const header = this.renderer.createElement('b');
    const content = this.renderer.createElement('div');
    const time = this.renderer.createElement('span');

    const classesToAdd = ['message-box'];
    classesToAdd.forEach((x) => this.renderer.addClass(notificationBox, x));

    this.renderer.setStyle(
      notificationBox,
      'transition',
      `opacity ${notification.duration}ms`
    );

    this.renderer.setStyle(notificationBox, 'opacity', '1');

    const headerText = this.renderer.createText(notification.title);
    this.renderer.appendChild(header, headerText);

    const contentText = this.renderer.createText(notification.message);
    this.renderer.appendChild(content, contentText);

    const formattedTime = this.renderer.createText(
      this.datePipe.transform(notification.timeDate, 'dd.MM.yyyy HH:mm')!
    );
    this.renderer.appendChild(time, formattedTime);

    this.renderer.addClass(notificationBox, 'slide-in-from-bottom');
    this.renderer.appendChild(this.container.nativeElement, notificationBox);
    this.renderer.appendChild(notificationBox, button);
    this.renderer.appendChild(notificationBox, header);
    this.renderer.appendChild(notificationBox, content);
    this.renderer.appendChild(notificationBox, time);

    setTimeout(() => {
      this.renderer.setStyle(notificationBox, 'opacity', '0');
      setTimeout(() => {
        this.renderer.setStyle(notificationBox, 'display', 'none');
      }, notification.duration);
    }, notification.duration);
  }

  private closeElement(notificationBox: any) {
    this.renderer.removeChild(this.container.nativeElement, notificationBox);
  }
}
