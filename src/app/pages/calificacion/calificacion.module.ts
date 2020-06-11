import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificacionPageRoutingModule } from './calificacion-routing.module';

import { CalificacionPage } from './calificacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CalificacionPageRoutingModule
  ],
  declarations: [CalificacionPage]
})
export class CalificacionPageModule {}
