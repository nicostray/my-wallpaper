import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if user is empty', () => {
    component.user = '';
    component.password = '1234';
    expect(component.loginValidation()).toBeFalse();
  });

  it('should return false if user length is less than 3 characters', () => {
    component.user = 'ab';
    component.password = '1234';
    expect(component.loginValidation()).toBeFalse();
  });

  it('should return false if user length is more than 8 characters', () => {
    component.user = 'abcdefghij';
    component.password = '1234';
    expect(component.loginValidation()).toBeFalse();
  });

  it('should return false if password is empty', () => {
    component.user = 'user';
    component.password = '';
    expect(component.loginValidation()).toBeFalse();
  });

  it('should return false if password length is not 4 characters', () => {
    component.user = 'user';
    component.password = '123';
    expect(component.loginValidation()).toBeFalse();
  });

  it('should return true if user and password are valid', () => {
    component.user = 'user';
    component.password = '1234';
    expect(component.loginValidation()).toBeTrue();
  });
});
