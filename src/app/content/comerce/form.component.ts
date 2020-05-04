import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {ComerceComponent} from "./comerce.component";
import {Comerce} from "./comerce";
import {ComerceService} from "./comerce.service";
import {Router} from "@angular/router";
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material/dialog";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public comerceControll = new FormControl('', Validators.required)
  comerce: Comerce= new Comerce();
  constructor(private comerceService : ComerceService, private router: Router, public dialogRef: MatDialogRef<FormComponent>,
              ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  public create(): void{
    console.log(this.comerce);
//the method create is summoned in the form.component.html class. this will create an offer and save it in DB. then will redirect to the offer page.
    this.comerceService.create(this.comerce).subscribe(response=>this.router.navigate(['/sales']))
  }


}
