import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {UserFirebase} from '../user-firebase';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'userManagement', alias: 'translate' }}]
})

export class RegisterComponent implements OnInit {
  user: UserFirebase = {
    email: '',
    password: 'string',
    displayName: '',
    role: {reader: true}
  };

  public registerForm: FormGroup;

  public listRoles = ['Warehouse', 'Manager', 'Shop'];

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private transloco: TranslocoService) {
  }

  /**When started, it will create a new instance of user.*/
  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      role: [this.listRoles[0], [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  /** This methods starts by checking if the formular is correct. Then will show a "sweetalert". Then it will go into
   * AuthService and use the register method. If the user wants it so, it will save the email in localstorage.
   *then it will navigate to mapcomponent. If there is an error it will show it in form of a "sweetalert"
   */
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.user = {
        email: this.registerForm.value.email,
        displayName: this.registerForm.value.name,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role
      };
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Registering user. One moment, please...'
      });
      Swal.showLoading();

      this.auth.signUp(this.user).then(resp => {
        Swal.close();
        Swal.fire(
          'Success',
          'User successfully registered.',
          'success'
        );
        this.router.navigateByUrl('/home');
      }).catch(error => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occured. Please try again later.'
      })
      );
    }
  }
}
