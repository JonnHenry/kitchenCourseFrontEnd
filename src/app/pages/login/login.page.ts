import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { UiServiceService } from 'src/app/api/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController,private menu: MenuController, private router: Router, private userService: UserService, private uiService: UiServiceService) {

  }

  public usuario = {
    email: '',
    password: ''
  }

  registrarse() {
    this.router.navigate(['/registro']);
  }


  login(formCrearUsuario) {
    const usurioCorrecto = this.userService.login(this.usuario);
    usurioCorrecto.then(respuesta => {
      const usuario = this.userService.usuario;
      if (respuesta) {
        this.uiService.presentToast(`Bienvenido: ${usuario.nombre}`);
        formCrearUsuario.reset();
        this.navCtrl.navigateRoot('/clases-home');
        this.onPageDidLeave();
      } else {
        this.uiService.presentToast('Usuario / contraseña no son validos');
      }
    })
    
  }


  ionViewWillEnter() {

    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the login page
    this.menu.enable(true);
  }

  ngOnInit() {
    this.userService.verificaLogin().then(inicioSesion=>{
      if (inicioSesion==true){
        this.navCtrl.navigateRoot('/clases-home');
        this.onPageDidLeave();
      }
    })
  }
}
