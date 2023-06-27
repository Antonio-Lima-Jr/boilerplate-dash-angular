import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  token: string | null = null;

  constructor(private nbAuthService: NbAuthService) {
    this.initToken();
  }

  initToken() {
    this.nbAuthService.onTokenChange().subscribe((token) => {
      this.token = token.getValue();
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.token ? 'Bearer ' + this.token : ''
      ),
    });
    return next.handle(dupReq);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class Interceptor {}
