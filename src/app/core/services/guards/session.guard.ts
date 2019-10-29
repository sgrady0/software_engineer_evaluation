import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  private readonly loginRoute: UrlTree = this.router.parseUrl('/login');

  constructor(
    private router: Router,
    private session: SessionService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.session.hasSession$.pipe(
      take(1),
      map(hasSession => hasSession ? true : this.loginRoute)
    );
  }
}
