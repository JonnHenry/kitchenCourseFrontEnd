import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasesService } from 'src/app/api/clases.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import ICalificacion from 'src/app/interfaces/ICalificacion';
import { UiServiceService } from 'src/app/api/ui-service.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.page.html',
  styleUrls: ['./calificacion.page.scss'],
})
export class CalificacionPage implements OnInit {

  constructor(private router: Router, private claseService: ClasesService, private router: Router, private activeRoute: ActivatedRoute, private uiService: UiServiceService) { }


  public comentarioCargado: boolean;
  public idClase: number;
  public calUsuario: ICalificacion = {
    calificacion: 2,
    comentario: ''
  }

  onRateChange(calificacion: number) {
    this.calUsuario.calificacion = calificacion
  }

  comentUsuario() {
    this.claseService.enviarCalificacion(this.idClase, this.calUsuario).then(resp => {
      if (resp == true) {
        this.uiService.presentToast('El comentario ha sido enviado con exito')
        this.router.navigate(['clase-especifica', this.idClase])
      } else {
        this.uiService.presentToast('Error, verifique si no ha enviado el comentario anteriormente')
      }
    })
  }

  ngOnInit() {
    this.comentarioCargado = false;
    this.activeRoute.params.subscribe((params: Params) => {
      this.comentarioCargado = true;
      this.idClase = Number(params.idClase)
    });
  }
}
