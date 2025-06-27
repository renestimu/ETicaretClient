import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

 async getRoles(page:number=0,size:number=5, successCalback:()=>void,errorCallBack:(errorMessage:string)=>void): Promise<{totalCount:number,datas: any[]}> {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'role',
      queryString: `page=${page}&size=${size}`
    });
    const promiseData = firstValueFrom(observable)
    promiseData.then(d => successCalback())
      .catch((e: any) => errorCallBack(e.message));
    return await promiseData as Promise<{totalCount:number,datas: any[]}>;

  }
  async createRole(name:string,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{succeeded :boolean}> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'role'
    }, { name: name });



    const promise=  firstValueFrom(observable);
    promise.then(d => {
      successCallBack();
    }).catch((e: any) => {
      errorCallBack(e.message);
    });
    return await promise as {succeeded :boolean};


  }
}
