import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindUsPage } from './find-us.page';

describe('FindUsPage', () => {
  let component: FindUsPage;
  let fixture: ComponentFixture<FindUsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
