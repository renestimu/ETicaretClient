import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClientService) {}
  async create(order: Create_Order):Promise<void> {
    const observable: Observable<any> = this.httpClient.post({controller: 'orders',},order);
    await firstValueFrom(observable);
  }
  async getAllOrders(page:number=0,size:number=5, successCalback:()=>void,errorCallBack:(errorMessage:string)=>void):Promise<{totalCount:number,orders: List_Order[]}> {
    const observable: Observable<{totalCount:number,orders: List_Order[]}> = this.httpClient.get({controller: 'orders',
      queryString: `page=${page}&size=${size}`,
    });
    const result =  firstValueFrom(observable);

    result.then(d => successCalback()).catch(e => errorCallBack(e));
    return await result;
  }
  async getOrderById(id: string,successCalback:()=>void,errorCallBack:(errorMessage:string)=>void): Promise<SingleOrder> {
    const observable: Observable<SingleOrder> = this.httpClient.get<SingleOrder>({
      controller: 'orders',
    },id);
    const result = firstValueFrom(observable);

    result.then(d => successCalback()).catch(e => errorCallBack(e));
    return await result;
  }
  async completeOrder(id:string){
    const observable : Observable<any> =this.httpClient.get({
      controller:"orders",
      action:"complete-order"
    },id);
    await firstValueFrom(observable);
  }
}
