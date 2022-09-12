import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/listProduct';
import { Product } from 'src/app/contracts/product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'stock', 'price', 'createDate', 'updateDate'];

  dataSource: MatTableDataSource<List_Product> = null
  async ngOnInit() {
   await this.getProducts();
  }

 async getProducts(){
    this.showSpinner(SpinnerType.BallAtom)
    const allProducts: {totalCount:number,products: List_Product[]} = await this.productService.readList(this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => { this.hideSpinner(SpinnerType.BallAtom); },
      errorMessage => { this.alertify.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight }) })
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length=allProducts.totalCount;
   // this.dataSource.paginator=this.paginator;

  }
async pageChanged(){
    await this.getProducts();
  }

}
