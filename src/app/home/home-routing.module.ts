import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'searchexpress',
        loadChildren: () => import('../searchexpress/searchexpress.module').then(m => m.SearchexpressPageModule)
      },
      {
        path: 'detailbalance',
        loadChildren: () => import('../detailbalance/detailbalance.module').then(m => m.DetailbalancePageModule)
      },
      {
        path: '',
        redirectTo: 'searchexpress', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
