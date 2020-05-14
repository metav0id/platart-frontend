import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserComponent} from "../models/user.component";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserComponent = new UserComponent();
  rememberUser = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true
    }

  }

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
