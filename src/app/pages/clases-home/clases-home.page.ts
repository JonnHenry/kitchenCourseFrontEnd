import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-clases-home',
  templateUrl: './clases-home.page.html',
  styleUrls: ['./clases-home.page.scss'],
})
export class ClasesHomePage implements OnInit {

  private subscribe: any;


  constructor(private menu: MenuController,private platform: Platform) { 
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666,()=>{
      if (this.constructor.name == 'ClasesHomePage'){
        if (window.confirm("Desea salir de la aplicion")){
          navigator["app"].exitApp();
        }
      }
  })


  }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.menu.enable(true);
  }

}
