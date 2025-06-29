import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
 constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name',"edit","delete"];

  dataSource: MatTableDataSource<List_Role> = null
  async ngOnInit() {
   await this.getRoles();
  }

 async getRoles(){
    this.showSpinner(SpinnerType.BallAtom)
    const allRoles: {totalCount:number,datas: List_Role[]} = await this.roleService.getRoles(this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => { this.hideSpinner(SpinnerType.BallAtom); },
      (errorMessage) => {
        this.hideSpinner(SpinnerType.BallAtom)
        this.alertify.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
      })
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas)
    this.paginator.length=allRoles.totalCount;
   // this.dataSource.allRoles=this.paginator;

  }
  async pageChanged(){
    await this.getRoles();
  }



}
