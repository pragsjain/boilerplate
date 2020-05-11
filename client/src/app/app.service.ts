import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable,throwError, of } from 'rxjs';
import { map ,catchError} from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  //private url =  'https://chatapi.edwisor.com';
  private url =  environment.SOCKET_ENDPOINT

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {} 
  getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  } 
  setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  getTokenFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('authtoken'));
  } 
  setTokenInLocalStorage = (data) =>{
    localStorage.setItem('token', JSON.stringify(data));
  }

  fullNameSource = new BehaviorSubject<string>('');
  fullName = this.fullNameSource.asObservable()

  Savesresponse(response)
  {
        let url =  'http://localhost:64726/Api/Login/Savesresponse';
        return this.http.post(url,response);
  }


  signupFunction(formdata): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/signup`, formdata);
  } 

  signinFunction(formdata): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/login`, formdata);
  } 

  logout(userId): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/${userId}/delete`,userId);
  } 

  requestReset(body): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/req-reset-password`, body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/new-password`, body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/valid-password-token`, body);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/all`)
    .pipe(map((response:any) =>{
        return response;
    }),catchError(<T>(error: any, result?: T) => {
      console.log(error);
      return this.handleError(error)
    }))
  } 

   getAllIssues(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issues/all`)
    .pipe(map((response:any) =>{
        return response;
    }),catchError(<T>(error: any, result?: T) => {
      console.log(error);
      return this.handleError(error)
    }))
  } 

   getIssueById(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issues/view/${issueId}`);
  } 
    
  createIssue(formdata): Observable<any> {
    return this.http.post(`${this.url}/api/v1/issues/create`, formdata);
  } 
    
  editIssue(data): Observable<any> {
    return this.http.put(`${this.url}/api/v1/issues/${data['issueId']}/edit`, data);
  } 

  deleteIssue(issueId): Observable<any> {
    return this.http.post(`${this.url}/api/v1/issues/${issueId}/delete`,issueId);
  } 

  getCommentbyIssueId(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/comments/view/${issueId}`)
    .pipe(map((response:any) =>{
        return response;
    }),catchError(<T>(error: any, result?: T) => {
      console.log(error);
      return this.handleError(error)
    }))
  } 

  createComment(formdata): Observable<any> {
    return this.http.post(`${this.url}/api/v1/comments/create`, formdata);
  } 

  deleteComment(commentId): Observable<any> {
    return this.http.post(`${this.url}/api/v1/comments/${commentId}/delete`,commentId);
  } 

  getFilebyIssueId(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/files/view/${issueId}`)
    .pipe(map((response:any) =>{
        return response;
    }),catchError(<T>(error: any, result?: T) => {
      console.log(error);
      return this.handleError(error)
    }))
  } 

  createFile(formdata): Observable<any> {
    console.log('here too')
    return this.http.post(`${this.url}/api/v1/files/create`, formdata);
  } 

  deleteFile(fileId): Observable<any> {
    return this.http.post(`${this.url}/api/v1/files/${fileId}/delete`,fileId);
  } 




  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.text}`;

    } // end condition *if

    this.toastr.error(err.error.text);
    return throwError(errorMessage);

  }  // END handleError

}
