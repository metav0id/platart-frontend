import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserFirebase} from "../pages/user-firebase";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
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

  getUserData(uid){
    this.afs.collection('users').doc(uid).get().subscribe(result => {
      const user = JSON.parse(localStorage.getItem('user'));

    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('IsLoggedIn Function:');
    console.log(user);
    return user !== null;
  }
}

