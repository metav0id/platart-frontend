import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {UserFirebase} from '../../services/user-firebase';
import {Marcador} from '../manager-map/components/marker.class';
import {ComerceService} from '../manager-map/comerce/comerce.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'userManagement', alias: 'translate'}}]
})

export class RegisterComponent implements OnInit {
  shopsOfUser: Marcador[] = new Array();
  user: UserFirebase = {
    email: '',
    password: 'string',
    displayName: '',
    role: {reader: true},
    shops: []
  };

  public registerForm: FormGroup;

  public listRoles = ['Warehouse', 'Manager', 'Shop'];

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private transloco: TranslocoService, private comServ: ComerceService) {
  }

  /**When started, it will create a new instance of user.*/
  ngOnInit() {
    this.createForm();
    this.getStores();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      role: [this.listRoles[0], [Validators.required]],
      password: [null, [Validators.required]],
      shops: [null, [Validators.required]]
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
        role: this.registerForm.value.role,
        shops: this.registerForm.value.shops
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
        this.auth.signOut();
        this.router.navigateByUrl('/login');
      }).catch(error => Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occured. Please try again later.'
        })
      );
    }
  }

  getStores() {
    this.comServ.readShops().subscribe(response => this.shopsOfUser = response);
  }
}
