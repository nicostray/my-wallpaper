import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageApiService {
  private baseUrl = 'https://ui-avatars.com/api/';
  constructor(
    private httpClient: HttpClient
  ) {}

  getProfileImage(username: string): Observable<Blob> {
    const background = '0D8ABC';
    const color = 'fff';
    const firstLetter = username && username !== '' ? username.charAt(0) : '•';
    return this.httpClient.get(`${this.baseUrl}?name=${firstLetter}&background=${background}&color=${color}`, {
      responseType: 'blob'
    });
  }
}
