import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from '@tx/core';

export enum LoginMode {
    LOGIN = 'login',
    REGISTER = 'register',
}
@Component({
    selector: 'tx-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{
    @Input() mode = LoginMode.LOGIN;

    constructor(protected authService$: AuthService) {
    }

    ngOnInit() {
        // this.authService$.login(
        //     {
        //         email: 'test',
        //         password: 'test',
        //     }).subscribe();
    }

    onSubmit() {

    }


}
