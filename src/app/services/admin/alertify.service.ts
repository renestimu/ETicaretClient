import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOthers: boolean = false) {
  message(message: string, options:Partial<AlertifyOptions>) {
    alertify.set("notifier", "delay", options.delay)
    alertify.set("notifier", "position", options.position)
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers)
      msj.dismissOthers();
  }
  dismis() {
    alertify.dismisAll();
  }
}
export class AlertifyOptions {
  messageType: MessageType=MessageType.Message;
  position: Position=Position.BottomLeft;
  delay: number=3;
  dismissOthers: boolean=false;
}
export enum MessageType {
  Error = "error",
  Message = "nessage",
  Success = "success",
  Notify = "notify",
  Warning = "warning"
}
export enum Position {
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right"
}
