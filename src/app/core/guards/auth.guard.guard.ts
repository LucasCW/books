import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);

  await auth.authStateReady();
  return !!auth.currentUser;
};
