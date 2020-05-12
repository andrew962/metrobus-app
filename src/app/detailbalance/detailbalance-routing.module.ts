import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailbalancePage } from './detailbalance.page';

const routes: Routes = [
  {
    path: '',
    component: DetailbalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailbalancePageRoutingModule {}
