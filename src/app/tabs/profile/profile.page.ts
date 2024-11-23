import { Component, OnInit } from '@angular/core';
import { ProfileImageApiService } from '../../service/profile-image-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  name: string = '';
  lastname: string = '';
  profileImage: any;
  // customPhoto: string | undefined = '';

  constructor(
    private profileImageApiService: ProfileImageApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.name = localStorage.getItem('name') || '';
    this.lastname = localStorage.getItem('lastname') || '';

    if (this.profileImage === undefined) {
    this.profileImageApiService
      .getProfileImage(this.username)
      .subscribe((blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    }
  }

  async takePicture () {
    try{
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.profileImage = image.dataUrl;
    } catch (error) {
      alert(error);
    }
  }
}
