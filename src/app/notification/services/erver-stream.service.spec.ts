import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ServerStreamService } from './server-stream.service';
import * as NotificationActions from '../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';

describe('ServerStreamService', () => {
  let service: ServerStreamService;
  let store: Store<AppStateInterface>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ServerStreamService],
    });
    service = TestBed.inject(ServerStreamService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to server stream', () => {
    spyOn(store, 'dispatch');
    spyOn(window, 'EventSource').and.returnValue({
      addEventListener: () => {},
      onerror: null,
      onmessage: null,
      onopen: null,
      readyState: 0,
      url: '',
      withCredentials: false,
      close: function (): void {
        throw new Error('Function not implemented.');
      },
      CONNECTING: 0,
      OPEN: 1,
      CLOSED: 2,
      removeEventListener: function <K extends keyof EventSourceEventMap>(
        type: K,
        listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
        options?: boolean | EventListenerOptions | undefined
      ): void {
        throw new Error('Function not implemented.');
      },
      dispatchEvent: function (event: Event): boolean {
        throw new Error('Function not implemented.');
      },
    });

    service.connect();

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.connectServerStream()
    );
    expect(window.EventSource).toHaveBeenCalledWith(
      'https://echo.websocket.org/.sse'
    );
  });
});
