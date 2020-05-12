import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailbalancePageRoutingModule } from './detailbalance-routing.module';

import { DetailbalancePage } from './detailbalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailbalancePageRoutingModule
  ],
  declarations: [DetailbalancePage]
})
export class DetailbalancePageModule {}
