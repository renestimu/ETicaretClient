import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService, spinner: NgxSpinnerService,private authService:AuthService,private activeRoute:ActivatedRoute,private router:Router) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  async login(usernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(usernameOrEmail,password,()=>{
      this.authService.identityCheck();
      this.activeRoute.queryParams.subscribe(params=>{
        const returnUrl:string=       params["returnUrl"]
        if(returnUrl){
            this.router.navigate([returnUrl]);
        }
      })
      this.hideSpinner(SpinnerType.BallAtom)});
  }
}
