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
import {FormComponent} from "../comerce/form.component";
import {MapService} from "../map/map.service";
import {Marcador} from "./marker.class";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {
  DialogData,
  MapComponent
} from "../map/map.component";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "@angular/router";
import {Comerce} from "../comerce/comerce";
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private mapService: MapService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

//When the component is started it gives a list with all markers back.
  ngOnInit(): void {
    this.mapService.readAllMarkersNoCoords().subscribe(response => this.allMarkers = response);
  }


  //This method will close the dialog window.
  onNoClick(): void {
    this.dialogRef.close();
  }

}
