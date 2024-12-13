import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {
  downloadLink= '';
  showDownloadLink = false;
  imageId = '';
  imageName = '';
  isFavorite = false;
  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.imageId = params['imageId'];
      this.imageName = params['imageName'];
    });
  }

  ionViewWillEnter() {
    this.checkFavorite()
  }

  downloadImage() {
    this.http.get(`https://i.imgur.com/${this.imageId}`, { responseType: 'blob' }).subscribe((blob: any) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'image.png';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  goBack(){
    this.navCtrl.back();
  }

  toggleFavorite() {
    let favoriteList = localStorage.getItem('favorites');
    if (favoriteList) {
      let favList = JSON.parse(favoriteList);
      if(this.isFavorite) {
        favList = favList.filter((fav: { id: string; }) => fav.id !== this.imageId);
        localStorage.setItem('favorites', JSON.stringify(favList));
        this.isFavorite = false;
      }else{
        favList.push({id: this.imageId, name: this.imageName});
        localStorage.setItem('favorites', JSON.stringify(favList));
        this.isFavorite = true;
      }
    }else{
      localStorage.setItem('favorites', JSON.stringify([
        {id: this.imageId, name: this.imageName}
      ]));
      this.isFavorite = true;
    }
  }

  checkFavorite(): boolean {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favs = JSON.parse(favorites);
      const result = favs.find((item: { id: string; }) => item.id === this.imageId);
      this.isFavorite = result;
    }
    return false;
  }
}
