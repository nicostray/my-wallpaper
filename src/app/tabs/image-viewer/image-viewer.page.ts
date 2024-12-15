import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {
  // downloadLink= '';
  // showDownloadLink = false;
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



  async downloadImage() {
    try {
      const blob = await this.http.get(`https://i.imgur.com/${this.imageId}`, { responseType: 'blob' }).toPromise();

      let base64Data = '';
      if (blob) {
        base64Data = await this.convertBlobToBase64(blob);
      } else {
        throw new Error('Failed to download image');
      }

      const fileName = `wallpaper-${Date.now()}.jpg`;
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
      });

      console.log('Imagen guardada en:', fileName);
    } catch (error) {
      console.error('Error al descargar o guardar la imagen:', error);
    }
  }


  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
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
