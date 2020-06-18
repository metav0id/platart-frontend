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
import {MapService} from "../map/map.service";
import {Marcador} from "./marker.class";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {
  DialogData,
} from "../map/map.component";
import {
  ActivatedRoute,
  Router
} from "@angular/router";



@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent implements OnInit {

  allMarkers: Marcador[];

  constructor(
    public dialogRef: MatDialogRef<MarkerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private mapService: MapService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.mapService.readAllMarkersNoCoords().subscribe(response => this.allMarkers = response);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
