import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClasesService } from 'src/app/api/clases.service';
import IClase from 'src/app/interfaces/IClase.interface';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-clase-especifica',
  templateUrl: './clase-especifica.page.html',
  styleUrls: ['./clase-especifica.page.scss'],
})
export class ClaseEspecificaPage implements OnInit {

  constructor(private router: Router, public sanitizer: DomSanitizer, private activeRoute: ActivatedRoute, private claseService: ClasesService) { }

  public argumento: any = 0;
  public claseCargada: boolean = false;
  public comentariosCargados: boolean = false;
  public clase: IClase;


  calificar() {
    this.router.navigate(['calificacion', this.clase.id])
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.claseCargada = false;
      this.claseService.getClaseEspecifica(params.id).then(res => {
        this.clase = res;
        this.claseCargada = true;
        this.claseService.getPathFotosAvatar(res).then(claseComent => {
          this.comentariosCargados = true;
          this.clase.comentarios = claseComent.comentarios;
        })
      })
    });

  }

}
