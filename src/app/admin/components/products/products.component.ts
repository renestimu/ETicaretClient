import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor( spinner:NgxSpinnerService,private httpClientService:HttpClientService,private dialogService:DialogService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.httpClientService.get<Product[]>({controller:"products"}).subscribe(data=>console.log(data));
   // this.httpClientService.post({controller:"products"},{name:"Kalem",stock:50,price:2}).subscribe(data=>console.log(data));
//   this.httpClientService.put({controller:"products"},{id:'b50a5ccb-a853-4256-a54b-7b825abdf722',name:"Defter",stock:150,price:2.5}).subscribe(data=>console.log(data));
  }
  @ViewChild(ListComponent) listComponents:ListComponent;

  createdProduct(create_product:Product){
    this.listComponents.getProducts();
  }
  openQrCodeDialog() {
    this.dialogService.openDialog({
      componetType:QrcodeReadingDialogComponent,
      data: "",
      options: {
        width: "1000px"
      },
      afterClosed: () => {
        this.listComponents.getProducts();
      }
    });
  }
}
