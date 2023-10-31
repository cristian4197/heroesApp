import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl = environments.baseUrl;

    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser():User| undefined {
        if (!this.user) return;

        return structuredClone(this.user);
    }

    login(email:string, password:string):Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => this.user = user),
            tap( user => localStorage.setItem('token', 'asSDSDSD23223.asSDSDSD23223.asSDSDSD23223'))
        );
    }

    checkAuthentication():Observable<boolean> {
        if(!localStorage.getItem('token')) return of(false);
        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user =>{ console.log(user);
            
                this.user = user}),
            // la doble negacion es para asegurar el retorno de un booleano
            map(user => !!user),
            catchError(err => of(false) )
        )
    }

    logout():void {
        this.user = undefined;
        localStorage.clear();
    }
    
}