import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/listProduct';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private filesService:FileService
  ) {}
  currentPageNo: number;
  products: List_Product[];
  totalCount: number;
  totalPageCount: number;
  pageSize: number = 4;
  pageList: number[] = [];
  baseUrl:BaseUrl;
  async ngOnInit() {

    this.baseUrl= await this.filesService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data: { totalCount: number; products: List_Product[] } =
        await this.productService.readList(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );

      this.products = data?.products;

      this.products = this.products.map<List_Product>(p=>{
        let listProduct:List_Product = {
          name:p.name,
          id:p.id,
          price:p.price,
          stock:p.stock,
          createDate:p.createDate,
          updateDate:p.updateDate,
          imagePath:p.productImageFiles.length?p.productImageFiles?.find(p=>p.showcase).path:"",
          productImageFiles:p.productImageFiles
        }
        return listProduct;
      });






      this.totalCount = data?.totalCount;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.pageList = [];
      if (this.currentPageNo - 3 <= 0) {
        for (let index = 1; index <= this.totalPageCount; index++) {
          this.pageList.push(index);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let index = this.totalPageCount-6; index <= this.totalPageCount; index++) {
          if(index>0)
          this.pageList.push(index);

        }
      }
      else{
        for (let index = this.totalPageCount-3; index <= this.totalPageCount+3; index++) {
          this.pageList.push(index);
        }
      }


    });
  }
}
