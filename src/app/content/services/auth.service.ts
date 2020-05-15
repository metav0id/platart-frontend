import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserComponent} from "../pages/models/user.component";
import {map} from "rxjs/operators";
import {id} from "@swimlane/ngx-charts";

import 'firebase/auth';

import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyCqV2cjIUIeQ_zpFCfbGWT11pNdI7Lka3k';
  userToken: string;
  savedToken: string;
  retrivedObject: any;
  retrivedEmail: any;
  userEmail: string;

  // create new user
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // sign in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // token
  // https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.readToken();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');

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
        console.log(resp)
        this.savedToken = ( resp ['idToken'] );
        console.log("savedtoken" + this.savedToken)
        this.saveToken( resp ['idToken'] );
        console.log("usertoken" + this.userToken)
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
        this.savedToken = ( resp ['idToken'] );
        console.log("savedtoken" + this.savedToken)
        this.saveToken( resp ['idToken'] );
        return resp;
      })
    );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expires', today.getTime().toString());
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

    this.getToken().subscribe(resp => {console.log("respuesta"+resp);})
    this.userEmail = localStorage.getItem('email');
    console.log(this.userEmail)
    console.log(this.retrivedEmail)

    if (this.userEmail!= this.retrivedEmail) {
      console.log("nein")
      return false;
    }
    const expires = Number(localStorage.getItem('expires'));
    const expDate = new Date();
    expDate.setTime(expires);
    if (expDate > new Date() ) {

      return true;
    } else {
      return false;
    }
  }


  private saveMail(email: string) {
    this.retrivedEmail = email;
  }

getToken():Observable<Object>{

  const authData = {
  idToken: localStorage.getItem('token')
  };
  console.log('In gettoken');
  // this.idToken = localStorage.getItem('token');
  console.log(authData)
  return this.http.post(`${this.url}/accounts:lookup?key=${this.apiKey}`, authData
)
.pipe(
  map(resp => {
    console.log('In getUser');
    console.log(resp);
    this.retrivedObject = ( resp ['users'] );
    console.log(this.retrivedObject);
    this.saveMail(this.retrivedObject[0].email);
    // this.retrivedEmail = this.retrivedObject[0].email;
    console.log(this.retrivedEmail);
    return resp;
  }))

}


}
