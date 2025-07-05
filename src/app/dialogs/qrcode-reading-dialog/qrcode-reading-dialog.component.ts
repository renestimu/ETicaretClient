import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { MatButton } from '@angular/material/button';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.css']
})
export class QrcodeReadingDialogComponent
  extends BaseDialog<QrcodeReadingDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService:CustomToastrService,
    private productService: ProductService
    ) {
    super(dialogRef);
  }
  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  onEvent(e : ScannerQRCodeResult[]){
    this.spinner.show(SpinnerType.BallAtom);
    let value = e[0].value
    let data = JSON.parse(value);
   let stock= this.txtStock.nativeElement.value;
    if(data !=null && data != undefined ){

      this.productService.updateStock(data.Id, parseInt(stock),()=>{
          $('#closeButton').click();
        this.toastrService.message(`${data.Name} ürünün stok bilgisi güncellendi`, "Başarılı", {
          messageType:ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }, (errorMessage) => {
        this.toastrService.message(errorMessage, "Hata", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight
        });
      });

    }
    this.spinner.hide(SpinnerType.BallAtom);

  }
}
