import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage {

  constructor(
    private router: Router
  ) { }

  goToHome() {
    this.router.navigate(['/']);
  }
}
