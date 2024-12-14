import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsonData from '../../../assets/imageList.json'
import { NavController } from '@ionic/angular';
import { ImageItemComponent } from '../../components/image-item/image-item.component';

interface ImageData {
  title: string;
  image: string;
}

interface ImageList {
  anime: ImageData[];
  animales: ImageData[];
  comida: ImageData[];
  tecnologia: ImageData[];
  navidad: ImageData[];
}

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {
  imageList: Array<ImageData> = []
  @ViewChildren(ImageItemComponent) imageItems!: QueryList<ImageItemComponent>;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      this.imageList = this.getImages(category.toLowerCase());
    });
  }

  ionViewWillEnter() {
    if (this.imageItems) {
      this.imageItems.forEach((imageItem) => {
        imageItem.checkFavorite();
      });
    }
  }

  getImages(category: string): Array<any> {
    const imageList = (jsonData as ImageList)[category as keyof ImageList];
    return imageList;
  }

  handleImage = (item: any) => {
    this.navCtrl.navigateForward(`/tabs/image-viewer?imageId=${item.image}&imageName=${item.title}`);
  }
}
