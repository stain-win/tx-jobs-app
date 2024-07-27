import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, DestroyService } from '@tx/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export const LoginMode = {
    LOGIN: 'login',
    REGISTER: 'register',
}

@Component({
    selector: 'tx-login',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [DestroyService],
    templateUrl: './login.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    @Input() mode = LoginMode.LOGIN;
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    loginError$: BehaviorSubject<string> = new BehaviorSubject('');
    private formValid = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected authService$: AuthService,
        protected formBuilder: FormBuilder,
        protected destroy$: DestroyService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });

        this.loginForm.statusChanges.pipe(
            tap((status) => {
                this.formValid = status === 'VALID';
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    onSubmit() {
        this.authService$.login({
            email: this.loginForm.value.username,
            password: this.loginForm.value.password
        }).pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
                this.loginError$.next('Login failed');
                return [];
            }),
        ).subscribe(
            () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                this.router.navigateByUrl(returnUrl).catch(
                    _ => this.router.navigateByUrl('/')
                );
            }
        );
    }


}
