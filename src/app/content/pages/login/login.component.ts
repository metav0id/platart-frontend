import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {UserFirebase} from '../../services/user-firebase';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'userManagement', alias: 'translate'}}]
})
export class LoginComponent implements OnInit {
  user: UserFirebase = {
    email: '',
    password: '',
    displayName: '',
    role: {reader: true}
  };

  constructor(private auth: AuthService, private router: Router, private transloco: TranslocoService) {
  }

  ngOnInit() {
  }

  /** This methods starts by checking if the formular is correct. Then will show a "sweetalert". Then it will go into
   * AuthService and use the login method. If the user wants it so, it will save the email in localstorage.
   * then it will navigate to mapcomponent. If there is an error it will show it in form of a "sweetalert"
   */
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Wait a moment...'
    });
    Swal.showLoading();
    this.auth.signIn(this.user.email, this.user.password).subscribe(resp => {
        Swal.close();
        this.router.navigate(['login']);
      }, (error => Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Login data are not correct, please try again.'
      }))
    );
  }
}
