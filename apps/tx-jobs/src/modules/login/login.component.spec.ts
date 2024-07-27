import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent, LoginMode } from './login.component';
import { AuthService } from '@tx/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jest.Mocked<AuthService>;
    let router: jest.Mocked<Router>;
    let activatedRoute: jest.Mocked<ActivatedRoute>;

    beforeEach(async () => {
        const authServiceMock = {
            login: jest.fn()
        };

        const routerMock = {
            navigateByUrl: jest.fn()
        };

        const activatedRouteMock = {
            snapshot: {
                queryParams: {}
            }
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
        router = TestBed.inject(Router) as jest.Mocked<Router>;
        activatedRoute = TestBed.inject(ActivatedRoute) as jest.Mocked<ActivatedRoute>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize loginForm correctly', () => {
        expect(component.loginForm).toBeTruthy();
        expect(component.loginForm.controls['username']).toBeTruthy();
        expect(component.loginForm.controls['password']).toBeTruthy();
    });


    it('should handle login errors correctly', () => {
        authService.login.mockReturnValue(throwError(new HttpErrorResponse({ error: 'error' })));
        component.loginForm.controls['username'].setValue('testuser');
        component.loginForm.controls['password'].setValue('password');
        component.onSubmit();
        expect(component.loginError$.value).toBe('Login failed');
    });
});
