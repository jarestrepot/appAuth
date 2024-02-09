import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if( authService.authStatus() === AuthStatus.authenticated ){
    const path: string|null = localStorage.getItem('path')
    router.navigateByUrl(path ?? '/dashboard');
    return false;
  }
  // Si retorna true puede entrar en esta ruta.
  return true;
};
