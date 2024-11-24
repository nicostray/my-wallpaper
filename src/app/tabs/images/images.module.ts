import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesPageRoutingModule } from './images-routing.module';

import { ImagesPage } from './images.page';
import { ImageItemComponent } from '../../components/image-item/image-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesPageRoutingModule,
    ImageItemComponent
  ],
  declarations: [ImagesPage]
})
export class ImagesPageModule {}
