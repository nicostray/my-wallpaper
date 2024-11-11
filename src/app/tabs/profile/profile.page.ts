import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  username = localStorage.getItem('username');
  name = localStorage.getItem('name');
  lastname = localStorage.getItem('lastname');

}
