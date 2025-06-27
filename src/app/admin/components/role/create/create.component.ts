import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends BaseComponent {
  constructor(
    private roleService: RoleService,
    spinner: NgxSpinnerService,
    private alertfy: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);


   this.roleService.createRole(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertfy.message("Rol başarıyla eklenmiştir.", { dismissOthers: true, messageType: MessageType.Success, position: Position.TopRight });
      this.createdRole.emit(name.value);
    }, (errorMessage) => {
      this.alertfy.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight });
    });


  }
}
