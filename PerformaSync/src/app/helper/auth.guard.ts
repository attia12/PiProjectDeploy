import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService)
  const router=inject(Router);
  const localData=userService.getToken();
  console.log(localData)
  if(localData != null)
  {
    return true;

  }
  else {
    router.navigateByUrl('/login')
    return false;
  }

};
