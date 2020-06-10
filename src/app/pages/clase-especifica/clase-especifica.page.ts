import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesService } from 'src/app/api/clases.service';

@Component({
  selector: 'app-clase-especifica',
  templateUrl: './clase-especifica.page.html',
  styleUrls: ['./clase-especifica.page.scss'],
})
export class ClaseEspecificaPage implements OnInit {

  public argumento: any=0;
  public claseCargada: boolean = false;
  public videoCargado: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private claseService: ClasesService ) { }

  public nombreClase = 'Sin nombre'

  ngOnInit() {
    this.claseCargada = false;
    this.argumento = this.activeRoute.snapshot.paramMap.get('id'); 
    this.claseService.getClaseEspecifica(this.argumento).then(res=>{
      console.log(res.clase)
    })
  }

}
