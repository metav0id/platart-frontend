import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserComponent} from "../pages/models/user.component";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyCqV2cjIUIeQ_zpFCfbGWT11pNdI7Lka3k';
  userToken: string;

  // create new user
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // sign in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.readToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(user: UserComponent) {
    const authData = {
      ...user,
      returnSecureToke: true
    };
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData
    ).pipe(
      map(resp => {
        console.log('In RXJS');
        this.saveToken( resp ['idToken'] );
        return resp;
      })
    );

  }

  register(user: UserComponent) {
    const authData = {
      ...user,
      returnSecureToke: true
    };
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData
    ).pipe(
      map(resp => {
        console.log('In RXJS');
        this.saveToken( resp ['idToken'] );
        return resp;
      })
    );

  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = ' ';
    }
    return this.userToken;
  }

  authStatus(): boolean{
    return this.userToken.length > 2;
  }
}
