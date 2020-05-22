export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:boolean;


}
 export class User{
   email: string;
   password: string;
   name: string;
   role: Roles;


   constructor(authData) {
     this.email = authData.email;
     this.password = authData.password;
     this.role = {reader:true}
   }
 }
