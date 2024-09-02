import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Create_Basket_Item } from 'src/app/contracts/basket/creeate-basket-item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClientService: HttpClientService) {}
  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> =
      this.httpClientService.get({ controller: 'baskets' });
    return await firstValueFrom(observable);
  }
  async add(product: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: 'baskets' },
      product
    );
    await firstValueFrom(observable);
  }
 async  updateQuantity(basketItem:Update_Basket_Item):Promise<void> {
    const observable: Observable<any> = this.httpClientService.put(
      { controller: 'baskets' },
      basketItem
    );
    await firstValueFrom(observable);
  }
  async delete(basketItemId: string): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete(
      { controller: 'baskets' },
      basketItemId
    );
    await firstValueFrom(observable);

  }
}
