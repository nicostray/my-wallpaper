import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
