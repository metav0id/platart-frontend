import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';
import {ElementComponent} from "./element/element.component";


@Component({
  selector: 'app-landing-page-warehouse',
  templateUrl: './landing-page-warehouse.component.html',
  styleUrls: ['./landing-page-warehouse.component.css']
})
export class LandingPageWarehouseComponent implements OnInit {
   _album: Array<any> = this.el.imagesBasic;
  _albumManager: Array<any> = this.el.imagesBasic;
  _albumWarehouse: Array<any> = this.el.imagesWarehouse;
  _albumSales: Array<any> = this.el.imagesSales;
  warehouse: String = "Warehouse manager";
  warehouseb:boolean;
  manager: String = "Manager";
  managerb: boolean;
  sales: String = "Sales";
  salesb: boolean;
  role: String;
  panelOpenState = false;
  constructor(private _lightbox: Lightbox, public el: ElementComponent, public lightboxConf: LightboxConfig ) {

  }


  open(index: number): void {
    if(this.role== 'Shop'){
      this._lightbox.open(this._album, index,{disableKeyboardNav: true, alwaysShowNavOnTouchDevices: false});
      // this._lightbox.open(this._albumSales, index);
    }else if(this.role== 'Warehouse'){
      // this.lightboxConf.disableKeyboardNav;
      this._lightbox.open(this._album, index,{disableKeyboardNav: true, alwaysShowNavOnTouchDevices: false});
      // this._lightbox.open(this._albumWarehouse, index);
    }else if(this.role== 'Manager') {
      // open lightbox
      this._lightbox.open(this._album, index);
    }

  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit(): void {
    // for (let i = 0; i <= 26; i++) {
    //   const src = this.el.imagesBasic[i].src;
    //   const caption = '';
    //   const thumb = this.el.imagesBasic[i].src;
    //   const album = {
    //     src: src,
    //     caption: caption,
    //     thumb: thumb
    //   };
    //   this._album.push(album);
    // }
    // console.log(this._album)
    this.readToken();
  }

  readToken() {
    this.role = localStorage.getItem('role');

    if ( this.role == "Manager") {
      this.managerb = true;
    } else if(this.role =="Shop") {
      this.salesb =true;
    }else if(this.role == "Warehouse"){
      this.warehouseb = true;
    }

  }
}
