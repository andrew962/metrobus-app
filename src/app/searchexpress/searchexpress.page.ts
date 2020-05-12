import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/services/balance.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BalanceResponce } from 'src/models/balance.model';
import * as _ from 'underscore';
import { AlertController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { InformationCardModel } from 'src/models/storage.model';
import { DetailbalancePage } from '../detailbalance/detailbalance.page';

@Component({
  selector: 'app-searchexpress',
  templateUrl: './searchexpress.page.html',
  styleUrls: ['./searchexpress.page.scss'],
})
export class SearchexpressPage implements OnInit {

  isViewValid: boolean = false;

  CanSave: boolean = false;

  cardIDField: FormControl;
  cardInformation: BalanceResponce;
  constructor(
    private balanceService: BalanceService,
    private fb: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    private storageService: StorageService
  ) {
    this.cardIDField = this.fb.control('', Validators.required);
  }

  ngOnInit() {
  }

  btnGetBalance() {
    this.isViewValid = true;
    this.cardInformation = null;
    this.balanceService.getBalance(this.cardIDField.value)
      .subscribe(res => {
        if (res.Success > 0) {
          this.cardInformation = res;
          this.CanSave = true;
          this.cardIDField.reset();
          this.cardIDField.updateValueAndValidity();
        } else {
          this.isViewValid = false;
          this.CanSave = false;
          this.cardIDField.reset();
          this.cardIDField.updateValueAndValidity();
          this.getError(res);
        }
      });
  }

  async getError(error) {
    const toast = await this.toastController.create({
      header: 'Error en consulta.',
      message: 'Revisa en número de la tarjeta y vuelve hacer la consultar.',
      color: 'danger',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => { }
      }
      ]
    });
    toast.present();
  }

  save(cardInformation: InformationCardModel) {
    this.storageService.addCard(cardInformation)
      .then(() => {
        this.cardIDField.reset();
        this.cardIDField.updateValueAndValidity();
      })
  }

  async btnSaveCard() {
    const alert = await this.alertController.create({
      header: 'Guardar',
      cssClass: 'buttonCss',
      inputs: [
        {
          name: '',
          id: 'CardName',
          type: 'text',
          placeholder: 'Nombre de tarjeta'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => { }
        }, {
          text: 'Guardar',
          cssClass: 'success',
          handler: name => {
            if (_.isEmpty(_.values(name)[0])) {
              this.testEmpty()
            } else {
              _.extend(this.cardInformation.Item, { Name: _.values(name)[0] });
              this.save(this.cardInformation.Item);
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async testEmpty() {
    const toast = await this.toastController.create({
      header: 'Suave!',
      message: 'Necesitas darle un nombre.',
      duration: 3000,
      color: 'warning'
    });
    toast.present();
  }
}
