import { Component, OnInit } from '@angular/core';
import {UserComponent} from "../models/user.component";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserComponent;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserComponent();
    // this.user.email = 'platart@gmail.com';
  }

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
