import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchexpressPage } from './searchexpress.page';

const routes: Routes = [
  {
    path: '',
    component: SearchexpressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchexpressPageRoutingModule {}
