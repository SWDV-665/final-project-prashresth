import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingReviewsPage } from './pending-reviews';

@NgModule({
  declarations: [
    PendingReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingReviewsPage),
  ],
})
export class PendingReviewsPageModule {}
