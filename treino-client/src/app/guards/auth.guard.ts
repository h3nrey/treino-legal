import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/users.service.ts.service';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isLoggedIn = !!userService.getToken();

  if (isLoggedIn) {
    router.navigate([{ outlets: { modal: null } }]);
    return false;
  }

  return true;
};
