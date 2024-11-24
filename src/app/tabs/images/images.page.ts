import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsonData from '../../../assets/imageList.json'

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

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      this.imageList = this.getImages(category.toLowerCase());
    });
  }

  getImages(category: string): Array<any> {
    const imageList = (jsonData as ImageList)[category as keyof ImageList];
    return imageList;
  }

}
