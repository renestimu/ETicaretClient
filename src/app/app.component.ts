import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { ComponentType} from '../app/services/common/dynamic-load-component.service'
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;


  title = 'ETicaretClient';
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router,private dynamicLoadComponentService:DynamicLoadComponentService){
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
  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);

  }
}
$(document).ready(()=>{
  //alert("merhaa");
})
