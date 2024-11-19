import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken(); 

  console.log('AuthInterceptor: Token fetched:', token); 

  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  //  'Content-Type' uniquement pour les requêtes avec un body
  if (req.method !== 'GET' && !authReq.headers.has('Content-Type')) {
    authReq = authReq.clone({
      headers: authReq.headers.set('Content-Type', 'application/json')
    });
  }

  return next(authReq);
};
