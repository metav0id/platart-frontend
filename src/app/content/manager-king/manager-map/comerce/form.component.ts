import {Component, Inject, OnInit} from '@angular/core';
import {Comerce} from "./comerce";
import {ComerceService} from "./comerce.service";
import {Router, ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl,} from "@angular/forms";
import {Marcador} from "../components/marker.class";
import {
  DialogData,
  MapComponent
} from "../map/map.component";
import {MapService} from "../map/map.service";
import {
  Observable,
  Subject
} from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  colorControl = new FormControl('primary');
  comerce: Comerce = new Comerce();


  constructor(private comerceService: ComerceService, private router: Router,
              public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  /**This method will close the dialog window.**/
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  /**This method create is summoned in the form.component.html class.
   * this will create an offer and save it in DB. then will redirect to the offer page.
   * **/
  public create(): void {
    console.log(this.comerce);
    this.comerceService.create(this.comerce).subscribe(response => {
      this.router.navigate(['map']);

    })
  }

  getComerce(comerce: Comerce): void {
    this.comerceService.getComerce(comerce).subscribe(response => this.comerce = response)
  }


}
