import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css'],
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService,
    private toastrService:CustomToastrService
  ) {
    super(dialogRef);
  }
  singleOrder: SingleOrder; // Replace with the actual type of the order data
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number = 0;


  async ngOnInit():Promise<void> {
    this.singleOrder= await this.orderService.getOrderById(this.data as string,
      () => {},
      (errorMessage: string) => {
        console.error(errorMessage);
      }
    );
    this.dataSource=this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.reduce((total, item) => total + (item.price*item.quantity), 0);
  }

  completeOrder(){
    this.dialogService.openDialog({
      componetType:CompleteOrderDialogComponent,
      data:CompleteOrderState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BallAtom)
       await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallAtom)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır. Müşteriye bilgi verilmiştir.","Sipariş tamamlandı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
      }
    })
  }
}
export enum OrderDetailDialogState {
  Close,
  OrderComplete,
}


