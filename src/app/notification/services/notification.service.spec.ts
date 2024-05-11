import { TestBed, inject } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notification', () => {
    service.showNotification('Test Title', 'Test Message');
    service.notification.subscribe((notification) => {
      expect(notification?.title).toBe('Test Title');
      expect(notification?.message).toBe('Test Message');
    });
  });

  it('should have initial value of showNotificationCenter$ as false', () => {
    service.showNotificationCenter$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
