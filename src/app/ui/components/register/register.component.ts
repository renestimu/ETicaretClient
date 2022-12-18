import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {


  frm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, spinner: NgxSpinnerService, private userService: UserService,private toastrService:CustomToastrService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.frm = this.fb.group({
      nameSurname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      userName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.email]],
      password: ["", [Validators.required]],
      repassword: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("repassword").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }
  get component() {
    return this.frm.controls;
  }

  submitted = false;

  async onSubmit(data: User) {
    this.submitted = true

    if (this.frm.invalid)
      return

    const result: Create_User = await this.userService.create(data);
    if(result.succeeded)
      this.toastrService.message(result.message,"Kullanıcı Kaydı Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopCenter});
    else{
      this.toastrService.message(result.message,"Kullanıcı Kaydı Hatalı",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopCenter});
    }
  }

}
