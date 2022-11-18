import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {


  constructor() { }

  handleError(error:any):string[]{
    let errorMsg:string = "";

    let errorMsgContent:string[] = ["",""];

    if(error.error instanceof ErrorEvent){
      // This would be a client-side error.
      errorMsgContent[1] = `Error: ${error.error.message}`;
    }else{
      // This would be a server-side error.
      
      errorMsgContent[0] = `Error Code: ${error.status}`;
      errorMsgContent[1] =`Message: ${error.message};`
      
    }
    console.log(errorMsg);
    return errorMsgContent
  }

}
