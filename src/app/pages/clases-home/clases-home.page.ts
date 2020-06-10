import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ClasesService } from 'src/app/api/clases.service';
import IClase from 'src/app/interfaces/IClase.interface';

@Component({
  selector: 'app-clases-home',
  templateUrl: './clases-home.page.html',
  styleUrls: ['./clases-home.page.scss'],
})
export class ClasesHomePage implements OnInit {

  private subscribe: any;
  public clasesCargadas: boolean = false;
  public clases: Array<IClase>;


  constructor(private menu: MenuController, private platform: Platform, private claseService: ClasesService) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == 'ClasesHomePage') {
        if (window.confirm("Desea salir de la aplicion")) {
          navigator["app"].exitApp();
        }
      }
    })
  }

  ngOnInit() {
    this.claseService.getClases().then(clases => {
      this.clases = clases
      console.log(clases)
      this.clasesCargadas = true;
    })
  }

  ionViewWillEnter() {

    this.menu.enable(true);
  }

}
