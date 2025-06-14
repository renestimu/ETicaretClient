
import { SocialUser } from '@abacritt/angularx-social-login/public-api';
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
  async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){
    const observable :Observable<any>=this.httpClient.post({
      action:"update-password",
      controller:"users"
    },{
      userId:userId,
      resetToken:resetToken,
      password:password,
      passwordConfirm:passwordConfirm
    });
      const promiseData:Promise<any>= firstValueFrom(observable);
      promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error));
      await promiseData;
  }
}
