import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = '';
  name = '';
  lastname = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  register() {
    const isValid = this.registerValidation();
    if (!isValid) return;
    this.navCtrl.navigateForward(['/tabs/home'], {
      queryParams: {
        user: this.user,
        name: this.name,
        lastname: this.lastname,
        password: this.password,
      },
    });
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  registerValidation(): boolean {
    if (!this.user) {
      this.showAlert('El usuario es requerido');
      return false;
    }
    if (this.user.length < 3 || this.user.length > 8) {
      this.showAlert('El usuario debe tener entre 3 y 8 caracteres');
      return false;
    }
    if (!this.name) {
      this.showAlert('El nombre es requerido');
      return false;
    }
    if (!this.lastname) {
      this.showAlert('El apellido es requerido');
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
}
