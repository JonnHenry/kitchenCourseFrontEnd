import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IUsuario from '../interfaces/interface.Usuario';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlServicio: string = 'http:localhost:3000';

  private token: any = null;
  public usuario: string = null;

  constructor(public _http: HttpClient, private navCtrl: NavController, private fileTransfer: FileTransfer) { }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //Retorna el token de un Usuario

  registrarUsuario(usuario: IUsuario): Promise<boolean> {
    const usuarioRegistro = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise<boolean>((resolve) => {
      this._http.post(this.urlServicio + '/user/create', usuarioRegistro, { headers: headers }).subscribe(async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false);
        }
      })
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  login(correo: string, password: string): Promise<boolean> {
    const data = {
      correo, password
    }
    const usuarioLogin = JSON.stringify(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise<boolean>(resolve => {
      this._http.post(this.urlServicio + '/user/login', usuarioLogin, { headers: headers }).subscribe(async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false);
        }
      })
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////  

  async guardarToken(token: string) {
    this.token = token;
    await Storage.set({
      key: 'token',
      value: token
    });
    await this.validaToken();
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async cargarToken() {
    this.token = (await (Storage.get({ key: 'token' }))).value || null;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'X-Token': this.token,
        'Content-Type': 'application/json'
      });
      this._http.get(`${this.urlServicio}/user/get`, { headers })
        .subscribe(resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  actualizarUsuario(usuario: any) {
    const headers = new HttpHeaders({
      'X-Token': this.token,
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this._http.post(`${this.urlServicio}/user/update`, usuario, { headers })
        .subscribe(resp => {
          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  ///Retorna true cuando se haya cargado completamente una imagen
  //Se pasa la ruta de la imagen

  subirImagen(img: string): Promise<boolean> {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'X-Token': this.token
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    return new Promise<boolean>(resolve => {
      fileTransfer.upload(img, `${this.urlServicio}/user/upload`, options)
        .then(data => {
          if (data['ok']) {
            this.guardarToken(data['token'])
            resolve(true)
          }
        }).catch(() => {
          resolve(false)
        });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  downloadAvatar() {
    const urlImagen = `${this.urlServicio}/user/imagen/avatar`;
    const headers = new HttpHeaders({
      'X-Token': this.token,
      'Content-Type': 'application/json'
    });

    return newPromise<string>(resolve=>{
      this._http.get(urlImagen,{headers: headers}).obser
    })



  }



  /////////////////////////////////////////////////////////////////////////////////////////////////////

  logout() {
    this.token = null;
    this.usuario = null;
    Storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
