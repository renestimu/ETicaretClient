import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,private userAuthService: UserAuthService,private alertifyService: AlertifyService) {
    super(spinner);
   }

  ngOnInit(): void {
  }

  passwordReset(email: string) {
    if (!email) {
      console.error('Email is required');
      return;
    }
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.passwordReset(email,()=>{
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertifyService.message("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",{
        messageType:MessageType.Success,
        position:Position.TopRight
      });
    });


    // Logic to reset the password
    console.log(`Password reset link sent to ${email}`);
  }

}
