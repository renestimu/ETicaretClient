import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  SpinnerType } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.css'],
})
export class QrcodeDialogComponent
  extends BaseDialog<QrcodeDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizer: DomSanitizer
  ) {
    super(dialogRef);
  }
  qrCodeUrl: SafeUrl;
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.BallAtom);
    const qrCodeBlob: Blob = await this.qrCodeService.generateQrCode(this.data);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeUrl=this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.BallAtom);
  }

  // This component can be used to display a QR code dialog.
  // You can add methods and properties as needed for your application.

  // Example method to close the dialog
  closeDialog() {
    // Logic to close the dialog
  }
}
