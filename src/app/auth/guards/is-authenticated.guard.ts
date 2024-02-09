import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.authenticated) return true;

  // if (authService.authStatus() === AuthStatus.checking ){
  //   return false;
  // }

  // Solo pasa cuando no esta autenticado.
  const router = inject(Router);

  const { url } = state;
  localStorage.setItem('path', url);

  router.navigateByUrl('/auth/login');

  return false;
};
