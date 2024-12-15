// src/app/guards/role.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RoleGuard } from './role.guard';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { RoleName } from '../../../models/enums/role-name.enum';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let secureApiService: jasmine.SpyObj<SecureApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const secureApiServiceSpy = jasmine.createSpyObj('SecureApiService', ['getCurrentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: SecureApiService, useValue: secureApiServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(RoleGuard);
    secureApiService = TestBed.inject(SecureApiService) as jasmine.SpyObj<SecureApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user has required role', (done) => {
    const mockUser: EmployeeConnected = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender:'Male',
      roles: [RoleName.ADMIN],
      // Ajoutez d'autres propriétés selon votre modèle
    };
    secureApiService.getCurrentUser.and.returnValue(of(mockUser));

    const route: any = { data: { roles: [RoleName.ADMIN, RoleName.SUPER_ADMIN] } };
    const state: any = {}; // Vous pouvez ajouter des propriétés si nécessaire

    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toBeTrue();
      expect(secureApiService.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to unauthorized when user lacks required role', (done) => {
    const mockUser: EmployeeConnected = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      gender:'Female',
      roles: [RoleName.USER],
      // Ajoutez d'autres propriétés selon votre modèle
    };
    secureApiService.getCurrentUser.and.returnValue(of(mockUser));

    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const route: any = { data: { roles: [RoleName.ADMIN, RoleName.SUPER_ADMIN] } };
    const state: any = {}; // Vous pouvez ajouter des propriétés si nécessaire

    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toBe(urlTree);
      expect(router.createUrlTree).toHaveBeenCalledWith(['/unauthorized']);
      expect(secureApiService.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login when an error occurs', (done) => {
    secureApiService.getCurrentUser.and.returnValue(throwError(() => new Error('Error')));

    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const route: any = { data: { roles: [RoleName.ADMIN, RoleName.SUPER_ADMIN] } };
    const state: any = {}; // Vous pouvez ajouter des propriétés si nécessaire

    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toBe(urlTree);
      expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
      expect(secureApiService.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });

  it('should handle routes with no roles specified', (done) => {
    const mockUser: EmployeeConnected = {
      id: 3,
      firstName: 'Alice',
      lastName: 'Wonderland',
      gender: 'Female',
      roles: [RoleName.ADMIN],
      // Ajoutez d'autres propriétés selon votre modèle
    };
    secureApiService.getCurrentUser.and.returnValue(of(mockUser));

    const route: any = { data: { roles: [] } };
    const state: any = {}; // Vous pouvez ajouter des propriétés si nécessaire

    guard.canActivate(route, state).subscribe((result) => {
      // Si aucun rôle n'est spécifié, on peut décider de permettre l'accès ou de restreindre.
      // Ici, on suppose qu'on permet l'accès.
      expect(result).toBeTrue();
      expect(secureApiService.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });
});
