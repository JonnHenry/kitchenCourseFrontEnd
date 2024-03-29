import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClasesHomePageRoutingModule } from './clases-home-routing.module';
import { ClasesHomePage } from './clases-home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicRatingModule,
    IonicModule,
    ClasesHomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClasesHomePage]
})
export class ClasesHomePageModule {}
