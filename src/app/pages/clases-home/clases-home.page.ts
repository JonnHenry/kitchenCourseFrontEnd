import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ClasesService } from 'src/app/api/clases.service';
import IClase from 'src/app/interfaces/IClase.interface';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-clases-home',
  templateUrl: './clases-home.page.html',
  styleUrls: ['./clases-home.page.scss'],
})
export class ClasesHomePage implements OnInit {

  private subscribe: any;
  public clasesCargadas: boolean = false;
  public clases: Array<IClase>;


  constructor(private principalComponent:AppComponent,private menu: MenuController, private platform: Platform,private router: Router, private claseService: ClasesService) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == 'ClasesHomePage') {
        if (window.confirm("Desea salir de la aplicion")) {
          navigator["app"].exitApp();
        }
      }
    })
  }

  entrarClase(id:number){
    this.router.navigate(['clase-especifica', id])
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.ngOnInit()
  }

  
  ngOnInit() {
    this.clasesCargadas = false;
    this.claseService.getClases().then(clases => {
      this.principalComponent.cargarUsuario()
      this.clases = clases;
      this.clasesCargadas = true;
    })
  }

  async ionViewWillEnter() {
    await this.menu.enable(true);
  }

}
