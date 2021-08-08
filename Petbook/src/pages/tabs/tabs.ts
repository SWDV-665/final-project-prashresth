import { Component } from '@angular/core';

import { DogsPage } from '../dogs/dogs';
import {PendingReviewsPage} from "../pending-reviews/pending-reviews";
import {PostAddPage} from "../post-add/post-add";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DogsPage;
  tab2Root = PendingReviewsPage;
  tab3Root = PostAddPage;

  constructor() {

  }
}
