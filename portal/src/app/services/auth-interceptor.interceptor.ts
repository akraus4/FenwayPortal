import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept (req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token')

    if (idToken) {
      const newReq = req.clone(
        {
          setHeaders: {
            authorization: `Bearer ${idToken}`,
            'content-type': 'application/json'
          }
        })
      console.log(`Interceptor Cloned === ${JSON.stringify(newReq)}`)
      console.log(`Interceptor body === ${newReq.body}`)
      return next.handle(newReq)
    } else {
      console.log(`Interceptor Req === ${req}`)
      return next.handle(req)
    }
  }
}
