import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IUsuario from '../interfaces/interface.Usuario';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import IUsuarioToken from '../interfaces/IUsuarioToken';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlServicio: string = "http://localhost:3000/user";

  private token: any = null;
  public usuario: IUsuarioToken;
  private fileTransfer: FileTransfer = new FileTransfer();

  constructor(private _http: HttpClient, private navCtrl: NavController) { }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //Retorna el token de un Usuario

  registrarUsuario(usuario: IUsuario): Promise<boolean> {
    const usuarioRegistro = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise<boolean>((resolve) => {
      this._http.post(`${this.urlServicio}/create`, usuarioRegistro, { headers: headers }).subscribe(async resp => {
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
  login(usuario: any): Promise<boolean> {

    const usuarioLogin = JSON.stringify(usuario);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise<boolean>(resolve => {
      this._http.post(`${this.urlServicio}/login`, usuarioLogin, { headers: headers }).subscribe(async resp => {
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

    if (this.token == null) {
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
          if (resp['ok']==true) {
            this.usuario = resp['usuario'];
            this.getFotoPath().then(resp=>{
              this.usuario.avatar = resp
              resolve(true);
            })
          } else {
            this.token = null;
            this.usuario = null;
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
      this._http.post(`${this.urlServicio}/update`, usuario, { headers })
        .subscribe(async resp => {
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
      fileTransfer.upload(img, `${this.urlServicio}/upload`, options)
        .then(async data => {
          if (data['ok']) {
            await this.guardarToken(data['token'])
            resolve(true)
          }
        }).catch(() => {
          resolve(false)
        });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  verificaLogin(): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      await this.validaToken();
      if (this.token != null) {
        await this.validaToken();
        resolve(true)
      } else {
        this.token = null
        this.navCtrl.navigateRoot('/login');
        resolve(false)
      }
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getUsuario(): Promise<IUsuarioToken> {
    return new Promise(async(resolve) => {
      await this.validaToken();
      resolve(this.usuario)
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getToken(){
    return new Promise<string>(async(resolve) => {
      await this.cargarToken();
      resolve(this.token)
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getFotoPath(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve(`${this.urlServicio}/imagen/avatar/${this.usuario._id}`);
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getPathAvatar(usuarioId){
    return new Promise<string>((resolve) => {
      resolve(`${this.urlServicio}/imagen/avatar/${usuarioId}`);
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
