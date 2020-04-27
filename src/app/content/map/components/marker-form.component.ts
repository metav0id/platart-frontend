import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormComponent} from "../../comerce/form.component";
import {MapService} from "../map.service";
import {Marcador} from "./marker.class";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {MapComponent} from "../map.component";


@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent implements OnInit {

  @Input() marker: Marcador;

  // marker: Marcador;

  allMarkers: Marcador[];


  public shopControll = new FormControl('', Validators.required)



  constructor(private mapService: MapService, public dialogRef: MatDialogRef<MarkerFormComponent>) { }

  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.allMarkers = response);
    console.log(this.allMarkers)
  }

edit():void{
  this.mapService.update(this.marker);

}
  readAll(): void {
    this.mapService.readAllMarkers().subscribe(response => this.allMarkers = response);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
