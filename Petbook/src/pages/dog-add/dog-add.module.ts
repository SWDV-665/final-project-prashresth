import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DogAddPage } from './dog-add';

@NgModule({
  declarations: [
    DogAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DogAddPage),
  ],
})
export class DogAddPageModule {}
