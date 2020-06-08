import { Component, OnInit } from '@angular/core';
import IUsuario from 'src/app/interfaces/interface.Usuario';
import { MenuController } from '@ionic/angular';
import {UiServiceService} from '../../api/ui-service.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  constructor(private uiService: UiServiceService,private menu: MenuController) { }


  public nombre_persona = {
    nombre: '',
    appelido: ''
  }

  public confirmacion = true;


  public usuario: IUsuario = {
    nombre: `${this.nombre_persona.nombre} ${this.nombre_persona.appelido}`,
    email: '',
    password: '',
    celular: '',
    sexo: ''
  }
 

  registrarUsuario(formCreateInv) {
    this.confirmacion = false;
    /*
    this.invtService.addInventario(this.inventario).subscribe(
      result => {
        this.confirmacion = true;
        formCreateInv.reset();
        this.presentToast(result.respuesta);
        this.router.navigateByUrl('/inventarios');
      },
      err => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      }
    );*/
  }


  ngOnInit() {
  }

  ionViewWillEnter() {

    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the login page
    this.menu.enable(true);
  }


}
