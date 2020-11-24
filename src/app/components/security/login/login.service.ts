import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {map,tap} from 'rxjs/internal/operators';

import {User} from './login.model';
import {RESTAURANT_API} from '../../../app.constants';

@Injectable()
export class LoginService {
    user: User;
    lastUrl: string;
    accessToken:string;

    constructor(private http: HttpClient, private router: Router) 
    {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    login(email: string, password: string): Observable<{success:boolean,token:string}> 
    {
        return this.http
        .post<{success:boolean,token:string}>(`${RESTAURANT_API}/api/v1/auth/login`, {userEmail: email, userPassword: password});
    }

    getUserData(): Observable<User> 
    {
        return this.http
            .get<User>(`${RESTAURANT_API}/api/v1/auth/me`)
            .pipe(map(responseData =>{
                let user:User;
                user= responseData["data"];
                return user;
            }));
    }

    signUp(name:string, email: string, password: string,city:string,country:string): Observable<any> 
    {
        return this.http
            
            .post<any>(`${RESTAURANT_API}/api/v1/auth/register`, {userName:name,userEmail: email, userPassword: password,isRestaurant:false,userCity:city,userCountry:country})
            .pipe(tap(user => this.user = user));
    }


    isLoggedIn(): boolean 
    {
        return this.user !== undefined;
    }

    handleLogin(path: string = this.lastUrl) 
    {
        this.router.navigate(['/login', btoa(path)]);
    }

    logout() 
    { this.http.get(`${RESTAURANT_API}/api/v1/auth/logout`).subscribe(user=> this.user = undefined)
    this.user = undefined;
    this.router.navigate([''])
    }

    updateUser(userEdited:{ name: string; email: string; }){
        return this.http.put(`${RESTAURANT_API}/api/v1/auth/update`, userEdited )
    }
}
