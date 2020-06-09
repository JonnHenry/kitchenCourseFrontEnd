import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }

  public usuario ={
    email: '',
    password: ''  
  }

  registrarse(){
    this.router.navigateByUrl('/registro');
  }


  ionViewWillEnter() {

    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the login page
    this.menu.enable(true);
  }

  ngOnInit() {
  }

}
