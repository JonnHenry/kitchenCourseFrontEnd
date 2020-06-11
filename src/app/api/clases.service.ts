import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IClase from '../interfaces/IClase.interface';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private _http: HttpClient) { }

  private urlServicio: string = "http://localhost:3000/curso";

  getClases(): Promise<Array<IClase>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this._http.get<any>(this.urlServicio + '/all', { headers: headers }).subscribe(async resp => {
        if (resp['ok']) {
          this.getClasesFormateada(resp.clases).then(clases => {
            resolve(clases)
          })
        } else {
          resolve([])
        }
      })
    })

  }

  getClaseEspecifica(id: string): Promise<IClase> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise<any>(resolve => {
      this._http.get(this.urlServicio + '/clase/' + id, { headers: headers }).subscribe((resp: any) => {
        this.getPathVideo(resp.clase.nombreVideo).then(respuesta=>{
          resp.clase.nombreVideo = respuesta;
          resolve(resp.clase)
        })
      })
    })
  }


  getPathVideo(video: string): Promise<string>{
    return new Promise<string>((resolve)=>{
      resolve(this.urlServicio+'/get/video/'+video)
    })
  }

  getClasesFormateada(clases: Array<IClase>): Promise<Array<IClase>> {
    return new Promise(async resolve => {
      for (let clase of clases) {
        clase.imagenClase = await this.getPathFotoClase(clase.imagenClase)
      }
      resolve(clases)
    })
  }

  getPathFotoClase(nombreImagen): Promise<string> {
    return new Promise<string>(resolve => {
      resolve(`${this.urlServicio}/get/img/${nombreImagen}`)
    })
  }


  obtenerImagen(imagen) {
    this._http.get(this.urlServicio + '/get/img/' + imagen).subscribe()
  }

}
