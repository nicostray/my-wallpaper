import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import jsonData from '../../../assets/imageList.json'
import { NavController } from '@ionic/angular';
import { ImageItemComponent } from '../../components/image-item/image-item.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageList: Array<any> = []
  @ViewChildren(ImageItemComponent) imageItems!: QueryList<ImageItemComponent>;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.imageList = this.selectRandomItems(jsonData);
  }

  ionViewWillEnter() {
    if (this.imageItems) {
      this.imageItems.forEach((imageItem) => {
        imageItem.checkFavorite();
      });
    }
  }

  selectRandomItems(data: any) {
    const categories = Object.keys(data);
    const selectedItems: Array<any> = [];

    categories.forEach(category => {
      const categoryItems = data[category];
      const randomIndex = Math.floor(Math.random() * categoryItems.length);
      selectedItems.push(categoryItems[randomIndex]);
    });

    while (selectedItems.length < 20) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const categoryItems = data[randomCategory];
      const randomIndex = Math.floor(Math.random() * categoryItems.length);
      if (!selectedItems.includes(categoryItems[randomIndex])) {
        selectedItems.push(categoryItems[randomIndex]);
      }
    }

    return selectedItems;
  }

  handleImage = (item: any) => {
    this.navCtrl.navigateForward(`/tabs/image-viewer?imageId=${item.image}&imageName=${item.title}`);
  }
}
