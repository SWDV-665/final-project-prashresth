import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DogDetailsPage } from './dog-details';

@NgModule({
  declarations: [
    DogDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DogDetailsPage),
  ],
})
export class DogDetailsPageModule {}
