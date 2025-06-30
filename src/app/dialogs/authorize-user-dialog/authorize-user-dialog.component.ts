import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { RoleService } from 'src/app/services/common/models/role.service';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.css']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit, OnDestroy {
 constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // You can define a specific type for data if needed
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService
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
    this.assignedRoles=await this.userService.getRolesToUser(
      this.data,
      () => {},
      (errorMessage: string) => {}
    );

  }
  async assignRoles(roles: MatSelectionList) {
    const selectedRoles = roles.selectedOptions.selected.map(
      (option) => option.value
    );
    this.spinner.show(SpinnerType.BallAtom);
    await this.userService.assignRoleToUser(
      this.data,
      selectedRoles,
      () => { this.spinner.hide(SpinnerType.BallAtom); },
      (errorMessage: string) => {
        console.error('Error assigning roles:', errorMessage);
        this.spinner.hide(SpinnerType.BallAtom);
      }
    );
  }

}
