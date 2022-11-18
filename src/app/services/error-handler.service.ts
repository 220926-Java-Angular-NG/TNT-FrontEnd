import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {


  constructor() { }

  handleError(error:any):string{
    let errorMsg:string = "";

    if(error.error instanceof ErrorEvent){
      // This would be a client-side error.
      errorMsg = `Error: ${error.error.message}`;
    }else{
      // This would be a server-side error.
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMsg);
    return errorMsg
  }

}
