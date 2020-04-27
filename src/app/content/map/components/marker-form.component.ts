import {
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material/dialog";
import {FormComponent} from "../../comerce/form.component";
import {MapService} from "../map.service";
import {Marcador} from "./marker.class";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {Shop} from "../../sales-princess/checkout-sold-items/checkout-sold-items.component";
import {
  DialogData,
  MapComponent
} from "../map.component";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {Comerce} from "../../comerce/comerce";
import {from} from "rxjs";


@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent implements OnInit {

  markersToEdit: Marcador[];
  allMarkers: Marcador[];




  public shopControll = new FormControl('', Validators.required)

  constructor(
    public dialogRef: MatDialogRef<MarkerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private mapService: MapService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.allMarkers = response);
  }

// edit(marker: Marcador): void{
//
//   console.log(marker.name);
//
//   this.mapService.getMarker(marker).subscribe( marker => this.marker = marker)
//   //add markers to array
//   this.markersToEdit.push(this.marker)
//   this.markersToEdit.push(this.marker2)
//   console.log(this.markersToEdit)
//
//   //send array to backend
//   this.mapService.update(this.markersToEdit)
//   console.log(this.marker.name)
//
// }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
