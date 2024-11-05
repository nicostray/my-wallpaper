import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menu.close('mainMenu');
      }
    })};

  logout(){
    this.router.navigate(['/login']);
  }
}
