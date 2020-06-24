import {Component, Inject, OnInit} from '@angular/core';
import {Comerce} from "./comerce";
import {ComerceService} from "./comerce.service";
import {Router, ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl,} from "@angular/forms";
import {
  DialogData,

} from "../map/map.component";
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class FormComponent implements OnInit {

  colorControl = new FormControl('primary');
  comerce: Comerce = new Comerce();


  constructor(private translocoService: TranslocoService, private comerceService: ComerceService, private router: Router,
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
    this.comerceService.create(this.comerce).subscribe(response => {
      this.router.navigate(['map']);
    })
  }

}
