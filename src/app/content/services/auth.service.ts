import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserFirebase} from './user-firebase';
import {Observable} from 'rxjs';
import {Marcador} from "../manager-king/manager-map/components/marker.class";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
   shopsOfUser: string[];

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {
    console.log('Reloading page...');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData(user.uid).subscribe(firestoreObj => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', firestoreObj.role);
          localStorage.setItem('shop', JSON.stringify(firestoreObj.shop));
          console.log()
        });
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('role', null);
        localStorage.setItem('shop', null);
      }
    });
  }

  signIn(email, password) {
    return new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        this.getUserData(user.user.uid).subscribe(firestoreObj => {
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('shop', JSON.stringify(firestoreObj.shop));
          localStorage.setItem('role', firestoreObj.role);

          let list = this.getStoresList();
          console.log("FINAL"+ list)

          observer.next();
          this.router.navigateByUrl('/landingPage');
        });
      }).catch(error => {
        localStorage.setItem('user', null);
        localStorage.setItem('shop', null);
        localStorage.setItem('role', null);
        observer.error();
      });
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      console.log('Calling from signOut-> authstate');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('shop');
    });
  }

  signUp(userInput: UserFirebase) {
    return this.afAuth.createUserWithEmailAndPassword(userInput.email, userInput.password).then(result => {
      this.setUserData(result.user, userInput.role);
    });
  }

  setUserData(user, role) {
    const userRef = this.afs.collection('users').doc(user.uid);
    const userData: UserFirebase = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      role
    };
    userRef.set(userData);
  }

  getUserData(uid): Observable<any> {
    const userRef = this.afs.collection('users').doc(uid);
    return new Observable(observer => userRef.get().subscribe(doc => {
      const data = doc.data();
      observer.next(data);
    }));
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    return user !== null;
  }

  isCorrectRole(roleComponent: string): boolean {
    const roleLocalStorage = localStorage.getItem('role');
    return roleLocalStorage === roleComponent || roleLocalStorage === 'Manager';
  }

  /** Creates field in local storage with array of stores, fills local variable with array and also prints themm all in console.log
   *
   * **/
  getStoresList(): string[] {
    let shopsOfUser:  string[] = JSON.parse(localStorage.getItem('shop'));
    for (let entry of shopsOfUser) {
      console.log(entry);
    }
    return shopsOfUser;
  }

/** Gets list of shops of current user
*
* **/
  getAllShopsFromUser(){
    return this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData(user.uid).subscribe(firestoreObj => {
          this.shopsOfUser = firestoreObj.shops;
        // this.getStoresList(firestoreObj)
          console.log(this.shopsOfUser);
        });
      } else {
        console.log("no shops assigned")
      }
    });

}

}
