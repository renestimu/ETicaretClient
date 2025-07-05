import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource,  _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/listProduct';
import { Product } from 'src/app/contracts/product';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ :any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService,private dialogService:DialogService) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'stock', 'price', 'createDate', 'updateDate',"photos","qrcode","edit","delete"];

  dataSource: MatTableDataSource<List_Product> = null
  async ngOnInit() {
   await this.getProducts();
  }

 async getProducts(){
    this.showSpinner(SpinnerType.BallAtom)
    const allProducts: {totalCount:number,products: List_Product[]} = await this.productService.readList(this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => { this.hideSpinner(SpinnerType.BallAtom); },
      errorMessage => {
        this.hideSpinner(SpinnerType.BallAtom)
        this.alertify.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
      })
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length=allProducts.totalCount;
   // this.dataSource.paginator=this.paginator;

  }
  async pageChanged(){
    await this.getProducts();
  }
openQrCodeDialog(id:string){
    this.dialogService.openDialog({
      componetType: QrcodeDialogComponent,
      data: id,

      afterClosed: () => {}
    });
  }


  // delete(id:string,event){

  //   const img:HTMLImageElement=event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(1000);
  // }

  addProductImages(id:string){
    this.dialogService.openDialog({
      componetType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px"
      }
    })
  }
}
