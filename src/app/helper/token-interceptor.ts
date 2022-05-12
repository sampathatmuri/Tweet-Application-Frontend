import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _toastrService: ToastrService,
        private _storageService: StorageService,
        private _router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.get('No-Auth') == "True")
            return next.handle(request.clone());

        else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._storageService.getToken()}`
                }
            });
            return next.handle(request).pipe(
                catchError(
                    (errorObj) => {
                        if (errorObj instanceof HttpErrorResponse) {
                            if (errorObj.status === 401) {
                                this._storageService.removeToken();
                                this._toastrService.error("Session expired", errorObj.error.error, { timeOut: 2000 });
                                this._router.navigateByUrl('/login');
                            }
                        }
                        return throwError(errorObj);
                    }
                )
            );

        }
    }
}
