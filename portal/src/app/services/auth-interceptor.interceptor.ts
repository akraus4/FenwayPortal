import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
                console.log('made to interceptor');
        const idToken = localStorage.getItem("id_token");

        if (idToken) {
            const newReq = req.clone(
                // {
                //     headers: req.headers.set('Authorization', `Bearer ${idToken}`)
                // });
            {
                setHeaders: {
                    authorization: `Bearer ${idToken}`
                  }
            });
            console.log(`Interceptor Cloned === ${JSON.stringify(newReq)}`);
            return next.handle(newReq);
        } else {
            console.log(`Interceptor Req === ${req}`);
            return next.handle(req);
        }
    }
}
