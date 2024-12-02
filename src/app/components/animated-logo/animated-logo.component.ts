import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-logo',
  standalone: true,
  templateUrl: './animated-logo.component.html',
  styleUrls: ['./animated-logo.component.scss'],
  imports: [NgFor]
})
export class AnimatedLogoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
