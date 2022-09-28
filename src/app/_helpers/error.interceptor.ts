import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { extractErrorMessagesFromErrorResponse } from './errors.service'
import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
                //cerrar sesión
                this.accountService.logout();
            }
            if([422].includes(err.status)){
                //mensajes de laravel
                let listError = extractErrorMessagesFromErrorResponse(err);
                return throwError(listError.toString().replace(/,/g, "\n"));
            }
            const error = err.error?.error || err.statusText;
            return throwError(error);
        }))
    }
}