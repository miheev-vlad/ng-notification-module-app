import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from '../types/notification.interface';
import { Store } from '@ngrx/store';
import * as NotificationActions from '../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Injectable({
  providedIn: 'root',
})
export class ServerStreamService {
  private eventSource!: EventSource;

  constructor(private store: Store<AppStateInterface>) {}

  connect(): Observable<INotification> {
    this.eventSource = new EventSource('https://echo.websocket.org/.sse');

    if (this.eventSource) {
      this.store.dispatch(NotificationActions.connectServerStream());
    }

    return new Observable<INotification>((observer) => {
      this.eventSource.addEventListener('time', (event: MessageEvent) => {
        observer.next({
          id: event.lastEventId,
          title: `Уведомение № ${event.lastEventId}`,
          message: `Сервер (${event.origin}) передал данные - ${event.data}`,
          timeDate: new Date().toISOString(),
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
