import {


  HttpInterceptorFn

} from '@angular/common/http';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";




export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService=inject(UserService)
  console.log('Intercepting request:');
  if (req.url.includes('/login')) {
    // Skip intercepting requests to the login route
    return next(req);
  }
  const token=userService.getToken();


  if(token) {
    const cloned=req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + token)
    });
    return next(cloned);
  } else {
    return next(req);
  }



};











