import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {UserFirebase} from '../user-firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserFirebase = {
    email: '',
    password: 'string',
    name: '',
    role: {reader: true}
  };
  rememberUser = false;

  constructor(private auth: AuthService, private router: Router, private guard: AuthGuard) {
  }
  /*When the module is initialized if will check for an email in the local storage of the bowser.*/
  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
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
    this.auth.logIn(this.user).subscribe(resp => {
        console.log(resp);
        Swal.close();
        if (this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'login data is not valid',
          text: err.error.error.message
        });
      }
    );
    console.log(form);
    console.log('Print if form is valid');
  }
}
