import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';

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
    private orderService: OrderService
  ) {
    super(dialogRef);
  }
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
  singleOrder: SingleOrder; // Replace with the actual type of the order data
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number = 0;
}
export enum OrderDetailDialogState {
  Close,
  OrderComplete,
}


