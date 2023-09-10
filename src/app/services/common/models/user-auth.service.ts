import { SocialUser } from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient: HttpClientService,private toasterService:CustomToastrService) { }

  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<void>{
    const observable:Observable<any | Token> = this.httpClient.post<any | Token>({
        controller:"auth",
        action:"login"
      },{usernameOrEmail,password})
      const token:TokenResponse= await firstValueFrom(observable) as TokenResponse;

      if(token){
        localStorage.setItem("accessToken",token.token.accessToken);
        localStorage.setItem("refreshToken",token.token.refreshToken);

        this.toasterService.message("Kullanici girişi başarı ile tamamlanmıştır.","Giriş Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
      }
      callBackFunction();
    }
    async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
      const observable:Observable<SocialUser | TokenResponse>= this.httpClient.post<SocialUser | TokenResponse>({
        action:"google-login",
        controller:"auth"
      },user);
      const token:TokenResponse= await firstValueFrom(observable) as TokenResponse;

      if(token){
        localStorage.setItem("accessToken",token.token.accessToken);
        localStorage.setItem("refreshToken",token.token.refreshToken);
        this.toasterService.message("Google girişi başarı ile tamamlanmıştır.","Giriş Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
      }
      callBackFunction();
    }

    async facebookLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
      const observable:Observable <SocialUser | TokenResponse>= this.httpClient.post<SocialUser | TokenResponse>({
        action:"facebook-login",
        controller:"auth"
      },user);
      const token:TokenResponse= await firstValueFrom(observable) as TokenResponse;
      if(token){
        localStorage.setItem("accessToken",token.token.accessToken);
        localStorage.setItem("refreshToken",token.token.refreshToken);
        this.toasterService.message("Facebook girişi başarı ile tamamlanmıştır.","Giriş Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
      }
      callBackFunction();
    }
    async refreshTokenLogin(refreshToken:string,callBackFunction?:()=>void):Promise<any>{
      const observable:Observable<any | TokenResponse>= this.httpClient.post<any | TokenResponse>({
        action:"refreshtokenlogi",
        controller:"auth"
      },{refreshToken:refreshToken});
      const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
      if(tokenResponse){
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);


      }
    }
}
