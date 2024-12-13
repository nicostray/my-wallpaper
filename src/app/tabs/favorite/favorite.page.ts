import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ImageItemComponent } from '../../components/image-item/image-item.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoriteList = this.getFavorites();
    @ViewChildren(ImageItemComponent) imageItems!: QueryList<ImageItemComponent>;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.favoriteList = this.getFavorites();
  }

  ionViewWillEnter() {
    if (this.imageItems) {
      this.imageItems.forEach((imageItem) => {
        imageItem.checkFavorite();
      });
    }
    this.favoriteList = this.getFavorites();
  }

  iterations = Array(3).fill(0);

  getFavorites() {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      return JSON.parse(favorites);
    }
    return [];
  }
  handleImage = (item: any) => {
    this.navCtrl.navigateForward(`/tabs/image-viewer?imageId=${item.id}&imageName=${item.name}`);
  }
}
