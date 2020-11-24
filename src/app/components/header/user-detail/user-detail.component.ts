import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../security/login/login.service';
import {User} from '../../security/login/login.model';
import { Router } from '@angular/router';

@Component({
    selector: 'lacc-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor(private loginService: LoginService, private route: Router) {
    }

    ngOnInit() {
    }

    user(): User {
        return this.loginService.user;
    }

    isLoggedIn(): boolean {
        return this.loginService.isLoggedIn();
    }

    login() {
        this.loginService.handleLogin();
    }

    logout() {
        this.loginService.logout();
    }
    userProfile(){
        this.route.navigate(['profile'])
    }
}
