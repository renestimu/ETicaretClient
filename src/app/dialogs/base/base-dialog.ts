import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";

export class BaseDialog<T> {

constructor(public dialogRef: MatDialogRef<T>){}

  close(): void {
    this.dialogRef.close();
  }
}
