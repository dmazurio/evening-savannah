import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';

@Injectable()
export class ApiService {


  constructor(private _http: Http) { }
  
  readonly API_URL:string = "https://evening-savannah-67907.herokuapp.com/api/v1/sys/signals/";
  
  getData( username: string ): Observable<any> {

        return this._http.get(this.API_URL+username)
                    .map(res => res.json() )
                    .catch(this.handleError)
                    .do(data => console.log('getData' + JSON.stringify( data )) );
  }

  saveDate( username: string, content: string ): Observable<any> {
    let body = {user: username, content};

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    let options = new RequestOptions({ headers: headers });

    return this._http.put(this.API_URL, JSON.stringify(body), options)
      .map(res => res.json() )
      .catch(this.handleError)
      .do(data => console.log('getData' + JSON.stringify( data )) );
  }

  private handleError(error: Response) {    
      return Observable.throw(error.json().error || 'Server error');
  }
}
