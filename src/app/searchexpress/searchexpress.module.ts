import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchexpressPageRoutingModule } from './searchexpress-routing.module';

import { SearchexpressPage } from './searchexpress.page';
import { DetailbalancePage } from '../detailbalance/detailbalance.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchexpressPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchexpressPage],
  providers: [DetailbalancePage]
})
export class SearchexpressPageModule { }
