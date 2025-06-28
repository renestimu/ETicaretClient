import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEndpointService {
  constructor(private httpClientService: HttpClientService) {}
  async assignRoles(
    roles: string[],
    code: string,
    menu: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: 'AuthorizationEndPoints' },
      {
        roles: roles,
        code: code,
        menu: menu,
      }
    );

    const promise = firstValueFrom(observable);
    promise
      .then((d: any) => {
        successCallBack();
      })
      .catch((e: any) => {
        errorCallBack(e.message);
      });
    return await promise;
  }
  async getRolesToEndPoint(code:string,menu:string, successCallBack?: () => void,errorCallBack?: (errorMessage: string) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'AuthorizationEndPoints',
      action: 'get-roles-to-endpoint',
    },{code: code,menu:menu});
    const promise = firstValueFrom(observable);
    promise
      .then((d: any) => {
        successCallBack();
      })
      .catch((e: any) => {
        errorCallBack(e.message);
      });
    return (await promise).roles as string[];
  }
}
