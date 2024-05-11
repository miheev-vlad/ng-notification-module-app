import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as NotificationActions from './actions';

@Injectable()
export class NotificationEffects {
  connectServerStreamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotificationActions.connectServerStreamFailure),
        tap(() => {
          console.error('Connect ServerStream error occurred');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
