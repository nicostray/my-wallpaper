import { TestBed } from '@angular/core/testing';

import { ProfileImageApiService } from './profile-image-api.service';

describe('ProfileImageApiService', () => {
  let service: ProfileImageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileImageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
