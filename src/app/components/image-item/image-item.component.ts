import { NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image-item',
  standalone: true,
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss'],
  imports: [NgFor]
})
export class ImageItemComponent {
  constructor() { }
  @Input() name: string = 'image name';
  @Input() image: string = 'assets/images/dummy_image.png';
}
