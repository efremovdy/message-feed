import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageModel } from './models/message-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getMessages() {
    return this.httpClient.get(this.SERVER_URL + '/messages').pipe(catchError(this.handleError));
  }

  public addNewMessage(message: MessageModel) {
    return this.httpClient.post(this.SERVER_URL + '/messages', message).pipe(catchError(this.handleError));
  }

  public getAuthors() {
    return this.httpClient.get(this.SERVER_URL + '/authors').pipe(catchError(this.handleError));
  }

  public getAuthorMessages(authorId: number) {
    return this.httpClient.get(this.SERVER_URL + '/messages',
      {
        params: {
          authorId: authorId.toString()
        }
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
