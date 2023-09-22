import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { List_Product } from 'src/app/contracts/listProduct';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Product, successCalback?: any,errorCallBack?:(errorMessage:string)=>void) {
    this.httpClientService.post({ controller: "products" }, product).subscribe(result => {
      successCalback();
      // alert("başarılı");
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
            message+="${_v}<br>"
        })

      });
      errorCallBack(message);
    });
  }

  async readList(page:number=0,size:number=5, successCalback:()=>void,errorCallBack:(errorMessage:string)=>void):Promise<{totalCount:number,products: List_Product[]}>{
  const proimiseData:Promise<{totalCount:number,products: List_Product[]}>=   this.httpClientService.get<{totalCount:number,products: List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

  //   const categories$ =  this.httpClientService.get<List_Product[]>({
  //     controller:"products"
  //   });
  //  const categories = await lastValueFrom(categories$);


    proimiseData.then(d=>successCalback()).catch((e:HttpErrorResponse)=>errorCallBack(e.message));
    return await proimiseData;
  }

  async delete(id:string){
    const deleteObservable:Observable<any>= this.httpClientService.delete<any>({
      controller:"products"
    },id)
    await firstValueFrom(deleteObservable);
  }

  async readImages(id:string,successCalback:()=>void):Promise<List_Product_Image[]>{
   const getO:Observable<List_Product_Image[]>=  this.httpClientService.get<List_Product_Image[]>({
      action:"getimages",
      controller:"products"
    },id);
    const images:List_Product_Image[]=await firstValueFrom(getO);
    successCalback();
    return images;
  }
  async deleteImage(productId:string,imageId,successCalback:()=>void){
   const deleteOb= this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:"imageId="+imageId
    },productId)
    await firstValueFrom(deleteOb);
    successCalback();

  }
  async changeShowcaseImage(imageId:string,productId:string,successCalback?:()=>void):Promise<void>{
  const changeShowcaseImageObservable=  this.httpClientService.get({
                  controller:"products",
                  action:"ChangeShowcaseImage",
                  queryString:`imageId=${imageId}&productId=${productId}`
                  });
  await firstValueFrom(changeShowcaseImageObservable)
  successCalback();
}

}
