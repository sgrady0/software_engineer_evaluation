import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { delay, distinctUntilChanged, shareReplay, switchMap, tap } from 'rxjs/operators';

import { SessionCredentials } from './session-credentials.interface';
import { SessionResponse } from './session-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // ReplaySubject allows for instantiation without providing an initial value, enabling the application to wait
  // until the existence or non-existence of a session has been determined before receiving an event.
  private readonly hasSession = new ReplaySubject<boolean>(1);
  readonly hasSession$ = this.hasSession.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor() {
    this.populateSession();
  }

  authenticate(auth: SessionCredentials): Observable<SessionResponse> {
    return of<SessionCredentials>(auth).pipe(
      // Mock server latency, verification…
      delay(1500),
      switchMap(mockServerValidation),
      // … end mocking.
      tap(this.handleAuthenticationRequest.bind(this))
    );
  }

  private populateSession(): void {
    // Here we would hit the API to see if a session exists for this user, but we're holding the session in
    // memory for this app; so we'll simulate a request to the server and set it false.
    setTimeout(this.destroySession.bind(this), 100);
  }

  private handleAuthenticationRequest({ is_error }: SessionResponse): void {
    if (is_error === false) { this.hasSession.next(true); }
  }

  private destroySession(): void {
    this.hasSession.next(false);
  }
}

function mockServerValidation({ username, password }: SessionCredentials): Observable<SessionResponse> {
  const isValidUsername = username === 'someone@example.com';
  const isValidPassword = password === 'password';
  return isValidUsername && isValidPassword
    ? of({ is_error: false, message: 'OK' })
    : throwError({ is_error: true, message: 'Invalid username or password.' });
}
