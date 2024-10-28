import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = '';
  name = '';
  lastName = '';
  educationLevel = '';
  birthDate = '';
  isCleaned = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.user = params['user'];
    });
  }

  async showInfo(){
    if (!this.name || !this.lastName){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El campo nombre y apellido son requeridos',
        buttons: ['OK']
      })
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Información',
      message: `Su nombre es ${this.name} ${this.lastName}`,
      buttons: ['OK']
    })
    await alert.present();
  }

  clearInputs(){
    this.name = '';
    this.lastName = '';
    this.educationLevel = '';
    this.birthDate = '';

    this.isCleaned = true;

    setTimeout(() => {
      this.isCleaned = false;
    }, 1000);
  }

}
