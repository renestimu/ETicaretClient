import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
 constructor(spinner: NgxSpinnerService, private userService: UserService, private alertify: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['userName', 'email', 'nameSurname',"twoFactorEnabled","role","delete"];

  dataSource: MatTableDataSource<List_User> = null
  async ngOnInit() {
   await this.getUsers();
  }

 async getUsers(){
    this.showSpinner(SpinnerType.BallAtom)
    const allUsers: {totalCount:number,users: List_User[]} = await this.userService.getAllUsers(this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => { this.hideSpinner(SpinnerType.BallAtom); },
      errorMessage => {
        this.hideSpinner(SpinnerType.BallAtom)
        this.alertify.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
      })
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users)
    this.paginator.length=allUsers.totalCount;
   // this.dataSource.paginator=this.paginator;

  }
  async pageChanged(){
    await this.getUsers();
  }
  showDetail(id:string){
  }
  assignRole(id:string){
    this.dialogService.openDialog({
      componetType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: "700px"
      },
      afterClosed: () => {
        this.getUsers();
      }
    });
  }
}
