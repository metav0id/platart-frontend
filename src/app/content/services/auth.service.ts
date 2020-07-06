import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserFirebase} from './user-firebase';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from "./warehouse-item-category-DTO";
import {environment} from "../../../environments/environment";
import {UserIn} from "../manager-king/register/userIn";
import {Comerce} from "../manager-king/manager-map/comerce/comerce";
import {MapService} from "../manager-king/manager-map/map/map.service";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  shopsOfUser: string[];
  shops:Comerce[] = new Array();
  comerces:String[] = new Array();
  users: UserIn[] = new Array();
  userin: UserIn = new UserIn();
  userin2: UserIn = new UserIn();

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router,
              public mapservice: MapService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData(user.uid).subscribe(firestoreObj => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', firestoreObj.role);
          localStorage.setItem('shops', JSON.stringify(firestoreObj.shops));
          this.getAllUsers(user);
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
    console.log(userInput)
    return this.afAuth.createUserWithEmailAndPassword(userInput.email, userInput.password).then(result => {
      this.setUserData(result.user, userInput.role, userInput.shops);
    });
  }

  setUserData(user, role, shops) {
    console.log(user,role,shops)
    const userRef = this.afs.collection('users').doc(user.uid);
    const userData: UserFirebase = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      role:role,
      shops: shops
    };
    console.log(userData)
    this.registerUserDB(userData);
    userRef.set(userData);
  }

  registerUserDB(user: UserFirebase) {
    console.log(user)
    this.userin.uid = user.uid;
    this.userin.shops = user.shops;
    console.log(this.userin);
    this.mapservice.createUser(this.userin).subscribe();

  }

  getUserData(uid): Observable<any> {
    const userRef = this.afs.collection('users').doc(uid);
    return new Observable(observer => userRef.get().subscribe(doc => {
      const data = doc.data();
      observer.next(data);
    }));
  }

  getAllUsers(user: UserFirebase) {
    this.userin2.uid = user.uid;
    return this.mapservice.readAllComercesOfUser(this.userin2).subscribe(response => {
      console.log(response)
        this.comerces = response;
        console.log(this.comerces)
      }
    );
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
