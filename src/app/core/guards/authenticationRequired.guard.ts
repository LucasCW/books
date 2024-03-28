import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationRequired: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  await auth.authStateReady();

  if (!!auth.currentUser) {
    return true;
  } else {
    router.navigate(['auth']);
    return false;
  }
};
