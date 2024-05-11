import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from '../types/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class ServerStreamService {
  private eventSource!: EventSource;

  constructor() {}

  connect(): Observable<INotification> {
    this.eventSource = new EventSource('https://echo.websocket.org/.sse');

    return new Observable<INotification>((observer) => {
      this.eventSource.addEventListener('time', (event: MessageEvent) => {
        observer.next({
          title: `Уведомение № ${event.lastEventId}`,
          message: `Сервер (${event.origin}) передал данные - ${event.data}`,
        });
      });

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  close() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
