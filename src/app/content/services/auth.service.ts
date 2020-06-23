import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserFirebase} from './user-firebase';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  shopsOfUser: string[];

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData(user.uid).subscribe(firestoreObj => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', firestoreObj.role);
          localStorage.setItem('shops', JSON.stringify(firestoreObj.shops));
        });
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('role', null);
        localStorage.setItem('shops', null);
        this.router.navigateByUrl('/landingPage');
      }
    });
  }

  signIn(email, password) {
    return new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        this.getUserData(user.user.uid).subscribe(firestoreObj => {
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('shops', JSON.stringify(firestoreObj.shops));
          localStorage.setItem('role', firestoreObj.role);
          observer.next();
          this.router.navigateByUrl('/landingPage');
        });
      }).catch(error => {
        localStorage.setItem('user', null);
        localStorage.setItem('shops', null);
        localStorage.setItem('role', null);
        observer.error();
      });
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('shops');
    });
  }

  signUp(userInput: UserFirebase) {
    return this.afAuth.createUserWithEmailAndPassword(userInput.email, userInput.password).then(result => {
      this.setUserData(result.user, userInput.role, userInput.shops);
    });
  }

  setUserData(user, role, shops) {
    const userRef = this.afs.collection('users').doc(user.uid);
    const userData: UserFirebase = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      role,
      shops: shops
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
    const shopsOfUser: string[] = JSON.parse(localStorage.getItem('shops'));
    return shopsOfUser;
  }

  /** Gets list of shops of current user
   *
   * **/
  getAllShopsFromUser() {
    return this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData(user.uid).subscribe(firestoreObj => {
          this.shopsOfUser = firestoreObj.shops;
          // this.getStoresList(firestoreObj)
          console.log(this.shopsOfUser);
        });
      } else {
        console.log("no shops assigned");
      }
    });

  }

}
