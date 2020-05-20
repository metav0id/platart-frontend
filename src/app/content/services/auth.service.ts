import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserComponent} from "../pages/models/user.component";
import {map} from "rxjs/operators";
import 'firebase/auth';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
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
  permission = false;

  // create new user
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // sign in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // token
  // https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]

  constructor(private http: HttpClient, private router: Router) {
    this.readToken();
  }

  /**This method deletes the token and the expiration code from the local storage making authentication impossible.
   *
   */
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    this.permission = false;
  }
/**This method uses the API from firebase to match the formular data to the one in firebase and allows the login
    *then it saves the generated token in the local storage and prints them both
    * */
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
  /**This method uses the API from firebase to match the formular data to the one in firebase and
      *allows the regustration
      *then it saves the generated token in the local storage and prints them both
    * */
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
  /*Saves the token and also sets the expiration date of the session */
  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expires', today.getTime().toString());
  }
  /**This method checks if there is a token in the local storage and if so it sets it in the variable
   * */
  readToken() {
    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = ' ';
    }
    return this.userToken;
  }



async myFunction(){
    const prom1 = new Promise((resolve,reject)=>{


    })
  prom1.then()
  prom1.catch()
  const value = <Observable<any>>await this.getToken();
    return Promise.resolve("firebase");
  }

  /**This method is called by the authentication service to see if the token saved is connected to a user and if so
    * it uses the token to compare the saved user to the one in local storage. if token and email are correct then it
    * allows to navigate
   * */
 wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }


  authStatus(): boolean{

    this.getToken().subscribe(resp => {
      this.permission =true;
      console.log(this.permission)
    })


    console.log('before');
    this.wait(4000);  //4 seconds in milliseconds
    console.log('after' + this.permission);


    // this.userEmail = localStorage.getItem('email');
    // console.log(this.userEmail)
    // console.log(this.retrivedEmail)
    //
    // if (this.userEmail!= this.retrivedEmail) {
    //   console.log("nein")
    //   return false;
    // }


    const expires = Number(localStorage.getItem('expires'));
    const expDate = new Date();
    expDate.setTime(expires);
    if (expDate > new Date() ) {
      console.log(this.permission)
      return this.permission;
    } else {
      return false;
    }
  }

  /** This method saves the email retrived by the token in a local variable.
   * */
  private saveMail(email: string) {
    this.retrivedEmail = email;
  }

getToken():Observable<Object>{

  const authData = {
  idToken: localStorage.getItem('token')
  };
  console.log('In gettoken');
  console.log(authData)
  return this.http.post(`${this.url}/accounts:lookup?key=${this.apiKey}`, authData
)
// .pipe(
//   map(resp => {
//     this.permission =true;
//     console.log('In Pipe');
//     console.log(resp);
//     this.retrivedObject = ( resp ['users'] );
//     console.log(this.retrivedObject);
//     this.saveMail(this.retrivedObject[0].email);
//     console.log(this.retrivedEmail);
//     return resp;
//   }))

}


//
// authStatus():Observable<boolean>{
//   return new Observable(( observer) => {
//     this.getToken().subscribe(resp => {
//       console.log("response")
//       console.log(resp);
//       this.permission =true;
//       console.log(this.permission)
//       const expires = Number(localStorage.getItem('expires'));
//       const expDate = new Date();
//       expDate.setTime(expires);
//       if (expDate > new Date() ) {
//         observer.next( this.permission);
//       } else {
//         observer.next( false);
//       }
//     })
//
//   })
//   // .subscribe(object => {return object});
//   // return this.getToken().subscribe(resp => {
//   //   this.permission =true;
//   //   console.log(this.permission)
//   //   const expires = Number(localStorage.getItem('expires'));
//   //   const expDate = new Date();
//   //   expDate.setTime(expires);
//   //   if (expDate > new Date() ) {
//   //     return this.permission;
//   //   } else {
//   //     return false;
//   //   }
//   // })
//
//   // this.userEmail = localStorage.getItem('email');
//   // console.log(this.userEmail)
//   // console.log(this.retrivedEmail)
//   //
//   // if (this.userEmail!= this.retrivedEmail) {
//   //   console.log("nein")
//   //   return false;
//   // }
//   // const expires = Number(localStorage.getItem('expires'));
//   // const expDate = new Date();
//   // expDate.setTime(expires);
//   // if (expDate > new Date() ) {
//   //   return this.permission;
//   // } else {
//   //   return false;
//   // }
// }


}

