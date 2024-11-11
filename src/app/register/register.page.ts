import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseServiceService } from '../service/database-service.service';

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
    private alertController: AlertController,
    private databaseService: DatabaseServiceService
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

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  registerValidation(): boolean {
    if (!this.user) {
      this.showAlert('Error','El usuario es requerido');
      return false;
    }
    if (this.user.length < 3 || this.user.length > 8) {
      this.showAlert('Error','El usuario debe tener entre 3 y 8 caracteres');
      return false;
    }
    if (!this.name) {
      this.showAlert('Error','El nombre es requerido');
      return false;
    }
    if (!this.lastname) {
      this.showAlert('Error','El apellido es requerido');
      return false;
    }
    if (!this.password) {
      this.showAlert('Error','La contraseña es requerida');
      return false;
    }
    if (this.password.length != 4) {
      this.showAlert('Error','La contraseña debe tener 4 caracteres');
      return false;
    }
    return true;
  }

  async registerUser(){
    this.databaseService.executeSQL(
      `INSERT INTO users (username, name, lastname, password) VALUES (?, ?, ?, ?)`,
      [this.user, this.name, this.lastname, this.password]
    ).then(() => {
      this.showAlert('Éxito','Usuario registrado correctamente');
      localStorage.setItem('username', this.user);
      localStorage.setItem('name', this.name);
      localStorage.setItem('lastname', this.lastname);
      this.navCtrl.navigateForward(['/tabs/home']);
    }).catch((error) => {
      console.error('Error al registrar usuario', error);
      this.showAlert('Error','Error al registrar usuario');
    });
  }
}
