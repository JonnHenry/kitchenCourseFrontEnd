import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesService } from 'src/app/api/clases.service';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import IClase from 'src/app/interfaces/IClase.interface';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-clase-especifica',
  templateUrl: './clase-especifica.page.html',
  styleUrls: ['./clase-especifica.page.scss'],
})
export class ClaseEspecificaPage implements OnInit {

  public argumento: any = 0;
  public claseCargada: boolean = false;
  public videoCargado: boolean = false;
  public clase: IClase;
  constructor(public sanitizer: DomSanitizer, private videoPlayer: VideoPlayer, private activeRoute: ActivatedRoute, private claseService: ClasesService) { }

  public nombreClase = 'Sin nombre'
  public videourl: string = 'http://localhost:3000/curso/get/video/Clase_1.mp4';
  public videoOpts : VideoOptions ;

  public playVideo() {
    this.videoOpts = { volume: 1.0 };
    this.videoPlayer.play(this.videourl).then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
  public stopPlayingVideo() {
    this.videoPlayer.close();
  }

  ngOnInit() {
    this.claseCargada = false;
    this.argumento = this.activeRoute.snapshot.paramMap.get('id');
    this.claseService.getClaseEspecifica(this.argumento).then(res => {
      this.claseService = res.clase;
      this.claseCargada = true;
    })
  }

}
