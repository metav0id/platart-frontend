import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserFirebase} from '../pages/user-firebase';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {
  }

  signIn(email, password) {
    return new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(resp => {
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
            this.getUserData(this.userData.uid).subscribe(obj => {
              if (obj) {
                console.log('Setting local storage');
                localStorage.setItem('user', JSON.stringify(this.userData));
                localStorage.setItem('role', obj.role);
                observer.next();
              }
            });
          } else {
            console.log('I am deleting local user');
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
        });
      });
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
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
    return user !== null;
  }

  isCorrectRole(roleComponent: string): boolean {
    const roleLocalStorage = localStorage.getItem('role');
    return roleLocalStorage === roleComponent || roleLocalStorage === 'Manager';
  }
}

