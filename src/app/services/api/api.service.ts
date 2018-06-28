import { Injectable, OnInit } from '@angular/core';
import {
  Headers,
  Http,
  Response,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// noinspection TypeScriptCheckImport
import * as _ from 'lodash';

@Injectable()
export class ApiService implements OnInit {

  public headers: Headers = new Headers({});

  protected apiUrl: string = 'https://progress-board-server.herokuapp.com/api/';
  protected prefix: string = 'v1/';
  protected endpoint: string = this.apiUrl + this.prefix;

  constructor(
    public http: Http
  ) {}

  public ngOnInit() {
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.endpoint}${path}`, this.getDefaultOptions())
      .map(this.checkForError)
      .catch(this.catchErr)
      .map(this.getJson);
  }

  public post(path: string, body: any, options?: any): Observable<any> {
    return this.http.post(
        `${this.endpoint}${path}`,
        body,
        this.getDefaultOptions(options)
      )
      .map(this.checkForError)
      .catch(this.catchErr)
      .map(this.getJson);
  }

  public put(path: string, body: any): Observable<any> {
    return this.http.put(
        `${this.endpoint}${path}`,
        JSON.stringify(body),
        this.getDefaultOptions()
      )
      .map(this.checkForError)
      .catch(this.catchErr)
      .map(this.getJson);
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.endpoint}${path}`, this.getDefaultOptions())
      .map(this.checkForError)
      .catch(this.catchErr)
      .map(this.getJson);
  }

  /**
   * Set request headers
   * @param headers
   */
  public setHeaders(headers) {
     Object.keys(headers)
      .forEach((header: any) => this.headers.set(header, headers[header]));
  }

  /**
   * Get json parsed response _body
   * @param {Response} resp
   * @returns {Response}
   */
  public getJson(resp: Response) {
    const r: any = _.clone(resp);
    /**
     * Handle empty _body response
     */
    return r && r._body && r._body.length ? resp.json() : resp;
  }

  public checkForError(resp: Response): Response {
    if (resp.status >= 500) {
      return resp;
    } else if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else if (resp.status === 401) {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      // Do any actions here, to handle 'Unauthorized'
      throw error;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      throw error;
    }
  }

  public catchErr(err: any) {
    if (err && err._body && typeof err._body === 'string') {
      const errBody: any = JSON.parse(err._body);
      err.message = errBody && errBody.error && errBody.error.message ?
        errBody.error.message : 'Error.';
    }
    return Observable.throw(err);
  }

  protected getDefaultOptions(optionalHeaders?: any): RequestOptions {
    const headers: any = new Headers(optionalHeaders || {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });
    return new RequestOptions({ headers });
  }
}
