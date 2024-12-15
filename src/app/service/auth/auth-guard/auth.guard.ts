
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {SecureApiService} from "../../api/api-security/secure-api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private secureApiService: SecureApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.secureApiService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      }),
      catchError(() => {
        return [this.router.createUrlTree(['/'])];
      })
    );
  }
}
