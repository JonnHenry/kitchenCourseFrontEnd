import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SubHeaderComponent } from './sub-header/sub-header.component';

@NgModule({
  declarations: [
    HeaderComponent,SubHeaderComponent
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
