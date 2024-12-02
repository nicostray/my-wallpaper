import { TestBed } from '@angular/core/testing';

import { ProfileImageApiService } from './profile-image-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileImageApiService', () => {
  let service: ProfileImageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ProfileImageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
