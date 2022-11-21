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

  handleSuccess():string[]{
    return [];
  }

  switchRespPresent():void{
    this.respPresent = (this.respPresent===true)? false:true;
  }

}
