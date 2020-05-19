import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import {Roles} from "./user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email: string;
  password: string;
  name: string;
  role: Roles;

  //
  // constructor(authData) {
  //   this.email = authData.email;
  //   this.password = authData.password;
  //   this.role = {reader:true}
  // }
  constructor() {

  }

  ngOnInit() {
  }

}
