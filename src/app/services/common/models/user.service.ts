
import { SocialUser } from '@abacritt/angularx-social-login/public-api';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { List_User } from 'src/app/contracts/users/list_user';

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
  async getAllUsers(pageIndex:number,pageSize:number,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,users:List_User[]}>{
    const observable: Observable<{totalCount:number,users:List_User[]}> = this.httpClient.get<{totalCount:number,users:List_User[]}>({
      controller:"users",
      queryString:`pageIndex=${pageIndex}&pageSize=${pageSize}`
    });
    const promiseData:Promise<{totalCount:number,users:List_User[]}> = firstValueFrom(observable);
    promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error));
    return await promiseData;
  }
  async assignRoleToUser(userId:string,roles:string[],successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<void>{
  const observable: Observable<any> = this.httpClient.post({
      controller:"users",
      action:"assign-role"
    }, {
      userId: userId,
      roles: roles
    });
    const promiseData: Promise<void> = firstValueFrom(observable);
    promiseData.then(value => {
      this.toasterService.message("Role assignment successful", "Role Assignment", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
      if (successCallBack) successCallBack();
    }).catch(error => {
      this.toasterService.message("Role assignment failed", "Role Assignment", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
      if (errorCallBack) errorCallBack(error);
    });
    return await promiseData;
  }
  async getRolesToUser(userId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<string[]>{
    const observable: Observable<any> = this.httpClient.get<string[]>({
      controller:"users",
      action:"get-roles-to-user"

    },userId);
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    return (await promiseData).roles as string[];
  }

}
