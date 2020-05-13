import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserComponent} from "../pages/models/user.component";
import {map} from "rxjs/operators";
import {id} from "@swimlane/ngx-charts";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Marcador} from "../map/components/marker.class";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyCqV2cjIUIeQ_zpFCfbGWT11pNdI7Lka3k';
  userToken: string;
  savedToken: string;
  idToken: string;
  retrivedEmail: string;
  userEmail: string;

  // create new user
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // sign in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // token
  // https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]

  constructor(private http: HttpClient, private firebase: AngularFireAuthModule) {
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
    console.log('In gettoken2');
    console.log(resp);
    this.retrivedEmail = ( resp ['email'] );
    console.log("retrived email" + this.retrivedEmail)
    return resp;
  }))

















    // .pipe(
    // map(resp => {
    //   console.log('In gettoken2');
    //   console.log(resp);
    //   this.retrivedEmail = ( resp ['email'] );
    //   console.log("retrived email" + this.retrivedEmail)
    //   return resp;
    // }))
}


  // getToken(){
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(function() {
  //       // Existing and future Auth states are now persisted in the current
  //       // session only. Closing the window would clear any existing state even
  //       // if a user forgets to sign out.
  //       // ...
  //       // New sign-in will be persisted with session persistence.
  //       console.log(this.user.email)
  //       console.log(this.user.password)
  //       return firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);
  //     })
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });
  // }




}
