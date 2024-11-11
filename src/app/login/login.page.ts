import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseServiceService } from '../service/database-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private databaseService: DatabaseServiceService
  ) {}

  ngOnInit() {}

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async login() {
    const isValid = this.loginValidation();
    if(!isValid) return;

    const isUser = await this.sqlValidation();
    if(!isUser) return;
    this.navCtrl.navigateForward(['/tabs/home'])
  }

  loginValidation(): boolean {
    if (!this.user) {
      this.showAlert('El usuario es requerido');
      return false;
    }
    if (this.user.length < 3 || this.user.length > 8) {
      this.showAlert('El user debe tener entre 3 y 8 caracteres');
      return false;
    }
    if (!this.password) {
      this.showAlert('La contraseña es requerida');
      return false;
    }
    if (this.password.length != 4) {
      this.showAlert('La contraseña debe tener 4 caracteres');
      return false;
    }
    return true;
  }

  async sqlValidation() {
    const response = await this.databaseService.getUser(
      this.user,
      this.password
    );
    if (response === null) {
      this.showAlert('Usuario o contraseña incorrectos');
      return false;
    }
    const { username, name, lastname } = response;
    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
    localStorage.setItem('lastname', lastname);
    return true;
  }
}
