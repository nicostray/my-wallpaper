import { Component, OnInit } from '@angular/core';
import { ProfileImageApiService } from '../../service/profile-image-api.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(
    private profileImageApiService: ProfileImageApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.name = localStorage.getItem('name') || '';
    this.lastname = localStorage.getItem('lastname') || '';

    this.profileImageApiService
      .getProfileImage(this.username)
      .subscribe((blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }
}
