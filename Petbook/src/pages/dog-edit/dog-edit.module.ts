import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DogEditPage } from './dog-edit';

@NgModule({
  declarations: [
    DogEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DogEditPage),
  ],
})
export class DogEditPageModule {}
