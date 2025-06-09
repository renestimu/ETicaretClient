import { Inject, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject('baseSignalRUrl') private baseSignalRUrl: string) {}

  // private _connection:HubConnection;
  // get connection():HubConnection{
  //   return this._connection;
  // }
  start(hubUrl: string) {
    if (!hubUrl.startsWith('http') && !hubUrl.startsWith('https')) {
      hubUrl = this.baseSignalRUrl + hubUrl;
    }

    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection: HubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log('Connected');
      })
      .catch((error) =>
        setTimeout(() => {
          this.start(hubUrl);
        }, 2000)
      );

    hubConnection.onreconnected((connectionId) => console.log('Reconnected'));
    hubConnection.onreconnecting((error) => console.log('onreconnecting'));
    hubConnection.onclose((error) => console.log('close onreconnecting'));
    return hubConnection;
  }
  invoke(
    hubUrl: string,
    procedureName: string,
    message: any,
    successCalback?: (value) => void,
    errorCalback?: (error) => void
  ) {
    this.start(hubUrl)
      .invoke(procedureName, message)
      .then(successCalback)
      .catch(errorCalback);
  }
  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
