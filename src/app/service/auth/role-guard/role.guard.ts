import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {SecureApiService} from "../../api/api-security/secure-api.service";
import {RoleName} from "../../../models/enums/role-name.enum";

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private secureApiService: SecureApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const expectedRoles: RoleName[] = route.data['roles'];

    return this.secureApiService.getCurrentUser().pipe(
      map(user => {
        const hasRole = expectedRoles.some(role => user.roles.includes(role));
        if (hasRole) {
          return true;
        } else {
          return this.router.createUrlTree(['/unauthorized']);
        }
      }),
      catchError(() => {
        return [this.router.createUrlTree(['/'])];
      })
    );
  }
}
