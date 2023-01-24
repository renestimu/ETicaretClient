import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router){
    this.authService.identityCheck();
  }
  signOut(){
    this.router.navigate([""]);
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.message("Oturum Kapatılmıştır.","Oturum Kapatıldı.",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
        })
  }
}
$(document).ready(()=>{
  //alert("merhaa");
})
