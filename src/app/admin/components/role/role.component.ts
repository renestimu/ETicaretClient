import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent extends BaseComponent {
  // This component serves as a container for the role management features.
  // It can be extended with additional logic or properties in the future.
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  createdRole(role: string) {
    this.listComponents.getRoles();
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
}
