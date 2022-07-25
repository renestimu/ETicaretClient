import { Injectable } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:Product,successCalback?:any){
    this.httpClientService.post({controller:"products"},product).subscribe(result=>{
      successCalback();
        alert("başarılı");
    });
  }
}
