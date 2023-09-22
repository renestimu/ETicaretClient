import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/base_url';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl(): Promise<BaseUrl>{
    const getob:Observable<BaseUrl>= this.httpClientService.get({
      controller:"files",
      action:'GetBaseStorageUrl',
    });

    return await firstValueFrom(getob)
  }
}
