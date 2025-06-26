import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.css']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any // You can define a specific type for data if needed
  ) {
    super(dialogRef);
  }
  ngOnDestroy(): void {

  }

  // You can add any additional methods or properties here if needed

}
export enum AuthorizeMenuState {
  Yes,
  No
}
export class AuthorizeMenuData{
  name: string;
  code: string;
}
