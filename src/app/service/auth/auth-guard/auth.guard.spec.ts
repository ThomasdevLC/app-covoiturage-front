// src/app/guards/auth.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let secureApiService: jasmine.SpyObj<SecureApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const secureApiServiceSpy = jasmine.createSpyObj('SecureApiService', ['getCurrentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: SecureApiService, useValue: secureApiServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    secureApiService = TestBed.inject(SecureApiService) as jasmine.SpyObj<SecureApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', (done) => {
    // @ts-ignore
    // @ts-ignore
    const mockUser: EmployeeConnected = {
      // ... initialisez les propriétés nécessaires de EmployeeConnected
      id: 1,
      "firstName": 'John',
      roles: ['USER'],
      // Ajoutez d'autres propriétés selon votre modèle
    };

    secureApiService.getCurrentUser.and.returnValue(of(mockUser));

    guard.canActivate(null as any, null as any).subscribe((result) => {
      expect(result).toBeTrue();
      expect(secureApiService.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login when user is not authenticated', (done) => {
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    // @ts-ignore
    secureApiService.getCurrentUser.and.returnValue(of(null));

    guard.canActivate(null as any, null as any).subscribe((result) => {
      expect(result).toBe(urlTree);
      expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should redirect to login when an error occurs', (done) => {
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    secureApiService.getCurrentUser.and.returnValue(throwError(() => new Error('Error')));

    guard.canActivate(null as any, null as any).subscribe((result) => {
      expect(result).toBe(urlTree);
      expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
