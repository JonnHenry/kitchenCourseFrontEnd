import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './api/user.service';
import { Network } from '@ionic-native/network/ngx';
import { UiServiceService } from './api/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public cargadoUser: boolean = false;

  public usuario: any = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private network: Network,
    private uiService: UiServiceService
  ) {
    this.initializeApp();
  }

  public disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    this.uiService.presentToast("No hay conexión a Internet!!");
  });

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  cerrarSesion() {
    this.userService.logout().then(() => {
      this.cargadoUser = false;
    })
  }


  public cargarUsuario() {
    this.cargadoUser = false;
    this.userService.verificaLogin()
      .then(inicioSesion => {
        if (inicioSesion == true) {
          this.userService.getUsuario().then(resultado => {
            this.usuario = resultado;
            this.cargadoUser = true;
          })
        }
      })

      .catch(() => {
        this.usuario = {}
        this.cargadoUser = false;
      })
  }

  ngOnInit() {
    this.cargarUsuario()
  }



}
