import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(request, next) {
    let authService = this.injector.get(AuthService);
    let authRequest = request.clone({
      setHeaders : {
        Authorization: `Barear ${authService.getToken()}`
     }
    });
    return next.handle(authRequest);
  }
}
