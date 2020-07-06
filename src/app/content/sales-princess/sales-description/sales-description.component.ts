import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SalesDescriptionService} from './sales-description.service';
import {MatSort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from '@angular/material/tooltip';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SalesDescriptionDetailsComponent} from './sales-description-details/sales-description-details.component';

@Component({
  selector: 'app-manager-sales-description',
  templateUrl: './sales-description.component.html',
  styleUrls: ['./sales-description.component.css'],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: {scope: 'salesPrincess', alias: 'translate'}
  }]
})
export class SalesDescriptionComponent implements OnInit {
  public deliveryShop = '';
  public shopsList: String[] = [];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['itemLastSold', 'category', 'priceListPerUnit', 'priceSalesPerUnit', 'revenuePerUnit'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  tomorrow = new Date();

  constructor(
    public dialog: MatDialog,
    private managerSalesDescriptionService: SalesDescriptionService,
    private auth: AuthService) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    this.tomorrow.setHours(23);
    this.tomorrow.setMinutes(59);
    this.tomorrow.setSeconds(59);
  }

  startDate = '';
  endDate = '';
  eventsTime: string[] = [];

  public formControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    // this.shopsList = this.auth.comerces;
    this.shopsList = this.auth.getStoresList();
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.startDate = newDate.toISOString();
    this.eventsTime.push(newDate.toISOString());
  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.startDate = newDate.toISOString();
    this.eventsTime.push(newDate.toISOString());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSoldItemsList(): void {
    if (this.startDate != '' && this.endDate != '' && this.deliveryShop != '') {
      Swal.showLoading();
      this.managerSalesDescriptionService.getSoldItemsList(this.deliveryShop, this.startDate, this.endDate)
        .subscribe((observable) => {
          this.dataSource = new MatTableDataSource(observable);
          this.dataSource.sort = this.sort;
          Swal.close();
        });
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Falta de información',
        text: 'Favor de cerciorarse que la sucursal este elgida así como fecha inicial y final.'
      });
    }
  }

  openDialogSalesDescriptionItem(element: any) {
    const dialogRef = this.dialog.open(SalesDescriptionDetailsComponent, {
      width: '250px',
      data: element
    });
  }
}
