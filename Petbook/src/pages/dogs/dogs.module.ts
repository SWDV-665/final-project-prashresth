import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DogsPage } from './dogs';

@NgModule({
  declarations: [
    DogsPage,
  ],
  imports: [
    IonicPageModule.forChild(DogsPage),
  ],
  exports: [
    DogsPage
  ]
})
export class DogsPageModule {}
