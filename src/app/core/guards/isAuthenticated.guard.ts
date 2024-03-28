import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  await auth.authStateReady();

  if (!!auth.currentUser) {
    router.navigate(['books']);
    return false;
  } else {
    return true;
  }
};
