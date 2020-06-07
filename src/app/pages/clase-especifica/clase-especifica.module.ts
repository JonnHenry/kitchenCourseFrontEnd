import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseEspecificaPageRoutingModule } from './clase-especifica-routing.module';

import { ClaseEspecificaPage } from './clase-especifica.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseEspecificaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClaseEspecificaPage]
})
export class ClaseEspecificaPageModule {}
