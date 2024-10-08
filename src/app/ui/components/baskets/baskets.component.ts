import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/basket.service';

declare var $;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService
  ) {
    super(spinner);
  }
  basketItems: List_Basket_Item[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
  }
 async changeQuantity(object:any){
  this.showSpinner(SpinnerType.BallAtom)
    const basketItemId:string= object.target.attributes["id"].value
    const quantity: number = object.target.value;
    const basketItem:Update_Basket_Item=new Update_Basket_Item();
    basketItem.basketItemId=basketItemId;
    basketItem.quantity=quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)
  }

  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallAtom)


    await this.basketService.delete(basketItemId)


    $('.'+basketItemId).fadeOut(500,()=> this.hideSpinner(SpinnerType.BallAtom));
  }

}
