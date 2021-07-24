import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/services/auth-service.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authService.getCurrentUser();
        const accessToken = this.authService.getToken();

        const isLoggedIn = currentUser && accessToken;
        const isApiUrl = request.url.startsWith(environment.API_URL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                    schoolId: `${currentUser.schoolId}`
                },
            });
        }

        return next.handle(request);
    }
}
