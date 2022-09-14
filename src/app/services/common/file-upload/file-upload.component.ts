import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService, private toaster: CustomToastrService) {

  }


  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file((_file: File) => {
          fileData.append(_file.name, _file, file.relativePath);
        })
      }
    }
    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {
      const message: string = "Dosyalar başarıyla yüklenmiştir."


      if (this.options.isAdminPage) {
        this.alertify.message(message, { dismissOthers: true, messageType: MessageType.Success, position: Position.TopRight });
      } else {
        this.toaster.message(message, "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight });
      }
    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Dosyalar yüklenirken bir hata ile karşılaşıldı."


      if (this.options.isAdminPage) {
        this.alertify.message(message, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight });
      } else {
        this.toaster.message(message, "Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight });
      }
    });

  }


}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}