import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-base',
//   templateUrl: './base.component.html',
//   styleUrls: ['./base.component.css']
// })
export class BaseComponent  {

  constructor(private spinner:NgxSpinnerService){}

  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);
    setTimeout(()=>this.hideSpinner(spinnerType),3000);
  }
  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType)
  }
}
export enum SpinnerType{
  BallAtom="s1",
  BallScaleMultiple="s2",
  BallSpinClockwiseFadeRotation="s3"
}
