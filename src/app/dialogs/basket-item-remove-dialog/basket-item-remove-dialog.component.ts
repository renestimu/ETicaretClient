import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.css']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent>  implements OnDestroy{

  constructor(dialogRef:MatDialogRef<BasketItemRemoveDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: BaseItemDeleteState,) {
    super(dialogRef);

  }
  ngOnDestroy(): void {
 //  console.log("BasketItemRemoveDialogComponent destroyed");
  }


}
export enum BaseItemDeleteState {
  Yes = 0,
  No = 1
}
