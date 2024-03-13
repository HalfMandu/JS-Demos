import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  
  constructor(private httpClient: HttpClient) {}

  configUrl = 'assets/config.json';

  //with a generic, Config (IUnterface below) that indicates the data return type
  getConfig(): Observable<Config> {
    return <Observable<any>>this.httpClient.get<Config>(this.configUrl)
      .pipe(catchError(this.errorHandler));
  }

  //Tell HttpClient that you want the full response with the observe option of the get() method...
  //Sometimes servers return special headers or status codes to indicate certain conditions...
  //...returns an Observable of type HttpResponse rather than just the JSON data contained in the body
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.httpClient.get<Config>(this.configUrl, { observe: 'response' });
  }
  
  //error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  // getPlayersFlat(): Observable<Player[]> {
  //   return <Observable<Player[]>> this.http.get<Player[]>(baseURL + 'api/player?year=2020')
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  // GET items whose name contains search term
  searchTerm(term: string): Observable<any> {
    //const params = new HttpParams({ fromString: 'name=term' });
    return this.httpClient.request('GET', this.configUrl + '?' + 'date=term', {responseType:'json'});
  }

}

//Interface, defines expected schema of object
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}