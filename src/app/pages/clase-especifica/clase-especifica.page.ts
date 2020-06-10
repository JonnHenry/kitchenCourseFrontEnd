import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clase-especifica',
  templateUrl: './clase-especifica.page.html',
  styleUrls: ['./clase-especifica.page.scss'],
})
export class ClaseEspecificaPage implements OnInit {

  public argumento: any=0;
  constructor(private activeRoute: ActivatedRoute) { }

  public nombreClase = 'Sin nombre'

  ngOnInit() {
    this.argumento = this.activeRoute.snapshot.paramMap.get('id'); 
  }

}
