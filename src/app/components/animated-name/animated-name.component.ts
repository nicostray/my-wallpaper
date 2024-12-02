import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-name',
  standalone: true,
  templateUrl: './animated-name.component.html',
  styleUrls: ['./animated-name.component.scss'],
  imports: [NgFor]
})
export class AnimatedNameComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
