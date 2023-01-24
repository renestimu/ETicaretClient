
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService,private toasterService:CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClient.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }
  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<void>{
  const observable:Observable<any | Token> = this.httpClient.post<any | Token>({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password})
    const token:TokenResponse= await firstValueFrom(observable) as TokenResponse;

    if(token){
      localStorage.setItem("accessToken",token.token.accessToken);

      this.toasterService.message("Kullanici girişi başarı ile tamamlanmıştır.","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

}
