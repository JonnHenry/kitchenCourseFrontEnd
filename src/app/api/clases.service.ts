import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private _http: HttpClient) { }

  private urlServicio: string = "http://localhost:3000/curso";

  getClases() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise(resolve=>{
      this._http.get(this.urlServicio + '/all', { headers: headers }).subscribe(async resp => {
        if (resp['ok']) {
          resolve(resp)
        } else {
          resolve({})
        }
      })
    })
    
  }
}
