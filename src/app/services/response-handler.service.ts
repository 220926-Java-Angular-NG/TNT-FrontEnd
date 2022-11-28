import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ResponseHandlerService {

  respPresent:boolean = false;
  isError:boolean = false;
  responseMsg:string[] = [];

  noticeTypes:{[key:string]:string} = {
    primary: "alert alert-primary",
    secondary:"alert alert-secondary",
    success:"alert alert-success",
    danger:"alert alert-danger",
    warning:"alert alert-warning",
    info:"alert alert-info",
    light:"alert alert-light",
    dark:"alert alert-dark"

  }


  constructor() { }

  emptyMsg():boolean{
    return this.responseMsg.length === 0;
  }


  handleError(error:any):void{
    let errorMsg:string = "";

    if(error.error instanceof ErrorEvent){
      // This would be a client-side error.
      this.responseMsg[1] = `Error: ${error.error.message}`;
    }else{
      // This would be a server-side error.
      
      this.responseMsg[0] = `Error Code: ${error.status}`;
      this.responseMsg[1] =`Message: ${error.message};`
      
    }
    console.log(errorMsg);
  }

  handleSuccess(status:string,message:string):void{
    this.responseMsg = [status,message];
  }

  switchRespPresent():void{
    this.respPresent = (this.respPresent===true)? false:true;
  }

}
