import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from './api/user.service';
import { UiServiceService } from './api/ui-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ClasesService } from './api/clases.service';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    IonicRatingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    MenuController,
    UserService,
    UiServiceService,
    ClasesService,
    AlertController, ToastController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
