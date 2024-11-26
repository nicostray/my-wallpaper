import { Component, OnInit } from '@angular/core';
import {Geolocation, PermissionStatus} from '@capacitor/geolocation'
@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.page.html',
  styleUrls: ['./find-us.page.scss'],
})
export class FindUsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getLocationAndShowOnMap();
  }

  async getLocationAndShowOnMap() {
    try {
      const permissions: PermissionStatus = await Geolocation.checkPermissions();

      if (permissions.location !== 'granted') {
        const requestPermissions = await Geolocation.requestPermissions();
        if (requestPermissions.location !== 'granted') {
          alert('Permiso de ubicación denegado');
          return;
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;



      const mapFrame: HTMLIFrameElement | null = document.getElementById(
        'mapFrame'
      ) as HTMLIFrameElement;

      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
      }
    } catch (error) {
      alert(error);
    }
  }
}
