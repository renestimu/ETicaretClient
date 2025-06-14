import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider,SocialLoginModule,SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { PasswordResetComponent } from './ui/components/password-reset/password-reset.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7132"]
      }
    }),
    SocialLoginModule
    ],
  providers: [
    {    provide:'baseUrl',useValue:"https://localhost:7132/api",multi:true},
    {    provide:'baseSignalRUrl',useValue:"https://localhost:7132/",multi:true},
    {
      provide:"SocialAuthServiceConfig",
      useValue:{
        autoLogin:false,
       providers:[
        {
          id:GoogleLoginProvider.PROVIDER_ID,
          provider:new GoogleLoginProvider(environment.googleKey)
        },
        {
          id:FacebookLoginProvider.PROVIDER_ID,
          provider:new FacebookLoginProvider(environment.facebookKey)
        },
      ],
        onError:err=>console.log(err)
      }as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
