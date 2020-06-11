import { Component, OnInit } from '@angular/core';
import { ClasesService } from 'src/app/api/clases.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.page.html',
  styleUrls: ['./calificacion.page.scss'],
})
export class CalificacionPage implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private claseService: ClasesService) { }
  public comentarioCargado: boolean;
  public idClase: number;
  public calUsuario={
    calificacion:0,
    comentario: ''
  }


  comentUsuario(){
    
  }

  ngOnInit() {
    this.comentarioCargado = false;
    this.activeRoute.params.subscribe((params: Params) => {
      this.claseService.getClaseEspecifica(params.idClase).then(res => {
        this.comentarioCargado = true;
        this.idClase = Number(res)
      })
    });
  }
}
