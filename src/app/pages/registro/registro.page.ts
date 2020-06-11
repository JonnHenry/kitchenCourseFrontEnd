import { Component, OnInit } from '@angular/core';
import IUsuario from 'src/app/interfaces/interface.Usuario';
import { MenuController, NavController } from '@ionic/angular';
import {UiServiceService} from '../../api/ui-service.service'
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  constructor(private navCtrl: NavController,private uiService: UiServiceService,private menu: MenuController, private userService: UserService) { }

  public nombre_persona = {
    nombre: '',
    apellido: ''
  }

  public usuario: IUsuario = {
    nombre: '',
    email: '',
    password: '',
    celular: '',
    sexo: ''
  }
 

  registrarUsuario(formCreateInv) {
    this.usuario.nombre = `${this.nombre_persona.nombre} ${this.nombre_persona.apellido}`
    this.userService.registrarUsuario(this.usuario).then(resultado=>{
      if (resultado==true){
        this.uiService.presentToast('El usuario se ha registrado con exito')
        formCreateInv.reset()
        this.navCtrl.navigateRoot('/clases-home');
      }else{
        this.uiService.presentToast('Revise los datos ingresados, pueden estar incorrectos')
      }
    })
  }


  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.menu.close();
    await this.menu.enable(false);
  }

  async onPageDidLeave() {
    await this.menu.enable(true);
  }


}
