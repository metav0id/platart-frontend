import { Component, OnInit } from '@angular/core';
import {UserComponent} from "../models/user.component";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  user: UserComponent;
  rememberUser = false;

constructor(private auth: AuthService, private router: Router) { }

/**When started, it will create a new instance of user.*/
  ngOnInit() {
    this.user = new UserComponent();
    // this.user.email = 'platart@gmail.com';
  }
  /** This methods starts by checking if the formular is correct. Then will show a "sweetalert". Then it will go into
     * AuthService and use the register method. If the user wants it so, it will save the email in localstorage.
      *then it will navigate to mapcomponent. If there is an error it will show it in form of a "sweetalert"
   */
  onSubmit(form: NgForm) {
    if (form.invalid) {return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Wait a moment...'
    });
    Swal.showLoading();
    console.log('Form sent');
    console.log(this.user);
    console.log(form);
    this.auth.register(this.user).subscribe(resp => {console.log(resp);
        Swal.close();
        if (this.rememberUser) {localStorage.setItem('email', this.user.email) }
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
  }
}
