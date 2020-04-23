import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopsCurrentInventoryDTO} from "../sales-princess-DTOs/ShopsCurrentInventoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  private readonly getAllItemsAllShopsUrl: string = 'http://localhost:8081/shops/getAllItemsAllShops';

  constructor(private http: HttpClient) { }

  public getAllItemsAllShops(): void{
    this.http.post<ShopsCurrentInventoryDTO[]>(this.getAllItemsAllShopsUrl, null).subscribe(JsonDto =>{
      console.log(JsonDto);
    })
  }

}
