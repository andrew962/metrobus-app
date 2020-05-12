import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { DetailbalancePage } from '../detailbalance/detailbalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage],
  providers: []
})
export class HomePageModule { }
