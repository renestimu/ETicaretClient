import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, Position,MessageType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
 constructor(spinner: NgxSpinnerService, private orderService: OrderService, private alertify: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createDate',"completed", "viewDetail","delete"];

  dataSource: MatTableDataSource<List_Order> = null
  async ngOnInit() {
   await this.getOrders();
  }

 async getOrders(){
    this.showSpinner(SpinnerType.BallAtom)
    const allOrders: {totalCount:number,orders: List_Order[]} = await this.orderService.getAllOrders(this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => { this.hideSpinner(SpinnerType.BallAtom); },
      errorMessage => {
        this.hideSpinner(SpinnerType.BallAtom)
        this.alertify.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
      })
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders)
    this.paginator.length=allOrders.totalCount;
   // this.dataSource.paginator=this.paginator;

  }
  async pageChanged(){
    await this.getOrders();
  }
  showDetail(id:string){
    this.dialogService.openDialog({
      componetType: OrderDetailDialogComponent,
      data:id,
      options: {
        width: "750px",
      }

      });
    }
  // delete(id:string,event){

  //   const img:HTMLImageElement=event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(1000);
  // }


}
