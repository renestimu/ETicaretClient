import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.css'],
})
export class AuthorizeMenuDialogComponent
  extends BaseDialog<AuthorizeMenuDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // You can define a specific type for data if needed
    private roleService: RoleService,
    private authorizationService: AuthorizationEndpointService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogRef);
  }
  ngOnDestroy(): void {}
  roles: { datas: List_Role[]; totalCount: number } = {
    datas: [],
    totalCount: 0,
  };
  assignedRoles: string[];

  async ngOnInit() {
    this.roles = await this.roleService.getRoles(-1,-1,() => {},(errorMessage: string) => {});
    this.assignedRoles=await this.authorizationService.getRolesToEndPoint(
      this.data.code,
      this.data.menuName,
      () => {},
      (errorMessage: string) => {}
    );

  }
  async assignRoles(roles: MatSelectionList) {
    const selectedRoles = roles.selectedOptions.selected.map(
      (option) => option.value
    );
    this.spinner.show(SpinnerType.BallAtom);
    await this.authorizationService.assignRoles(
      selectedRoles,
      this.data.code,
      this.data.menuName,
      () => { this.spinner.hide(SpinnerType.BallAtom); },
      (errorMessage: string) => {
        console.error('Error assigning roles:', errorMessage);
        this.spinner.hide(SpinnerType.BallAtom);
      }
    );
  }
}
export enum AuthorizeMenuState {
  Yes,
  No,
}
export class AuthorizeMenuData {
  name: string;
  code: string;
}
