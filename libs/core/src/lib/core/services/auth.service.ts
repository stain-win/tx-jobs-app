import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserLogin, UserResponse} from '../models';
import {ApiUrlService} from './api-url.service';
import {environment} from '@tx/core/environment';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { error } from 'ng-packagr/lib/utils/log';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private _baseUrl: string = environment?.auth?.baseUrl ?? '';
    constructor(protected _http: HttpClient, protected _apiUrlService: ApiUrlService) {
    }

    login(credentials: UserLogin): Observable<UserResponse | null> {
        return this._http.post<UserResponse | null>(this._apiUrlService.createApiUrl('users/login', {
            apiBaseUrl: this._baseUrl,
            apiPath: environment.auth?.apiPath ?? '',
            apiVersion: environment.auth?.apiVersion ?? ''}), {user: credentials}).pipe(
                catchError((error) => {throw error}),
                tap((res: UserResponse | null) => {
                    if(!res?.user) return;
                    this.currentUser$.next(res.user as User);
                    localStorage.setItem('token', res.user.token);
                })
        );
    }

    logout(): void {
        this.currentUser$.next(null);
        localStorage.removeItem('token');
    }

    fetchCurrentUserData(): Observable<User | null> {
        return this._http.get<User | null>(this._apiUrlService.createApiUrl('user', {
            apiBaseUrl: this._baseUrl,
            apiPath: environment.auth?.apiPath ?? '',
            apiVersion: environment.auth?.apiPath ?? ''
        })).pipe(
            catchError(() => of(null)),
        );
    }

    isAuth(): boolean {
        return !!localStorage.getItem('token');
    }

}
