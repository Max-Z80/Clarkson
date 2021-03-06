import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../model/auth-credentials';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loading: boolean;
    public loginForm: FormGroup;
    public errorResponse: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }

        this.loginForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() { }

    public logIn(value: any) {

        this.loading = true;
        this.authService.logIn(new AuthCredentials(value.username, value.password)).subscribe(

            data => {

                this.loading = false;
                this.authService.setToken(data.token);
                this.router.navigate(['/dashboard']);
            },

            err => {

                this.loading = false;
                this.showErrorMessage(err);
            }
        );
    }

    public showErrorMessage(err: any) {

        if (typeof err.error.message === 'string') {
            this.errorResponse = err.error.message;
        } else {
            this.errorResponse = err.error.message.sqlMessage;
        }
    }

    public registrationsEnabled() {
        return environment.enableRegistrations;
    }
}
