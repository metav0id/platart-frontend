import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Comerce} from "../comerce/comerce";
import {ComerceService} from "../comerce/comerce.service";
import {Router} from "@angular/router";
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material/dialog";
import {DialogData} from "../map/map.component";
import {FormComponent} from "../comerce/form.component";
import {MapService} from "../map/map.service";
import {Marcador} from "../components/marker.class";

@Component({
  selector: 'app-comerce-form',
  templateUrl: './comerce-form.component.html',
  styleUrls: ['./comerce-form.component.css']
})
export class ComerceFormComponent implements OnInit {

  colorControl = new FormControl('primary');
  marcador: Marcador = new Marcador(this.data['lat'], this.data['lng']);


  constructor(private comerceService : ComerceService, private router: Router, private mapService: MapService,
              public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  /**This method will close the dialog window.**/
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }


  getMarcador(comerce: Comerce):void{
    this.comerceService.getComerce(comerce).subscribe(response=> comerce = response)
  }

  /**This method saves the edited field in the asigned marker
   * **/
  public save(): void{
    console.log(this.marcador);
    this.mapService.edit(this.marcador)
    }

}
