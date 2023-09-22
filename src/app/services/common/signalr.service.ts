import { Injectable } from '@angular/core';
import { HubConnection,HubConnectionBuilder,HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection:HubConnection;
  get connection():HubConnection{
    return this._connection;
  }
  start(hubUrl:string){
    if(!this.connection || this._connection?.state==HubConnectionState.Disconnected){
      const builder:HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection:HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      hubConnection.start().then(()=> {
        console.log("Connected");

      }).catch(error=>setTimeout(() => {
        this.start(hubUrl)
      }, 2000));
      this._connection=hubConnection;
    }

    this._connection.onreconnected(connectionId=> console.log("Reconnected"));
    this._connection.onreconnecting(error=>console.log("onreconnecting"));
    this._connection.onclose(error=>console.log("close onreconnecting"));
  }
  invoke(procedureName:string,message:any,successCalback?:(value)=>void,errorCalback?:(error)=>void){
    this.connection.invoke(procedureName,message)
    .then(successCalback)
    .catch(errorCalback)

  }
  on(procedureName:string,callBack:(...message:any)=>void){
    this.connection.on(procedureName,callBack);
  }
}
