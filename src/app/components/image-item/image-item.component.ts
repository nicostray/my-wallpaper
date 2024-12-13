import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-image-item',
  standalone: true,
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss'],
  imports: [NgFor, IonicModule, CommonModule]
})
export class ImageItemComponent {
  isFavorite: boolean = true;
  constructor() { }
  @Input() name: string = 'image name';
  @Input() image: string = 'assets/images/dummy_image.png';

  ngOnInit() {
    this.checkFavorite();
  }

  checkFavorite(): boolean {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favs = JSON.parse(favorites);
      const result = favs.find((item: { id: string; }) => item.id === this.image);
      this.isFavorite = result;
    }
    return false;
  }
}
