import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { InformationCardModel } from 'src/models/storage.model';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { BalanceService } from 'src/services/balance.service';
import { BalanceResponce } from 'src/models/balance.model';

@Component({
  selector: 'app-detailbalance',
  templateUrl: './detailbalance.page.html',
  styleUrls: ['./detailbalance.page.scss'],
})
export class DetailbalancePage implements OnInit, OnDestroy {
  cardInformation: InformationCardModel[] = [];

  cardInformation$: Observable<InformationCardModel[]>
  cardInformationSubject: BehaviorSubject<InformationCardModel[]> = new BehaviorSubject<InformationCardModel[]>([]);

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    public alertController: AlertController,
    private balanceService: BalanceService
  ) {
    this.cardInformation$ = this.cardInformationSubject.asObservable();
    this.platform.ready().then(() => this.getData());
  }
  ngOnDestroy(): void {

  }

  ngOnInit() { }

  doRefresh(event?) {
    setTimeout(() => {
      this.storageService.getCards()
        .then(items => this.cardInformationSubject.next(items));
      event.target.complete();
    }, 2000);
  }
  ionViewWillEnter() {
    this.storageService.getCards()
      .then(items => {
        return new Promise(resolve => {
          this.cardInformationSubject.next(items);
          resolve();
        })
      });
  }

  getData() {
    this.storageService.getCards()
      .then(items => {
        return new Promise(resolve => {
          this.cardInformationSubject.next(items);
          resolve();
        })
      });
  }
  cardBalance = {};
  async btnUpdateCard(cardID: string, index) {
    this.cardBalance = null;
    let item: InformationCardModel;
    this.storageService.getCards().then(cards => {
      if (_.isObject(_.findWhere(cards, { CardID: cardID })) && !_.isNull(_.isObject(_.findWhere(cards, { CardID: cardID })))) {
        item = _.findWhere(cards, { CardID: cardID });
        this.balanceService.getBalance(Number(item.CardID)).subscribe(res => {
          this.cardBalance = res;
          if (res.Success >= 1) {
            item.Balance = res.Item.Balance;
            this.storageService.updateCard(item).then(() => {
              this.getData();
            });
          } else {

          }
        });
      }
    });
  }

  async btnEditCard(cardID: string) {
    let item: InformationCardModel;
    this.storageService.getCards().then(cards => {
      if (_.isObject(_.findWhere(cards, { CardID: cardID })) && !_.isNull(_.isObject(_.findWhere(cards, { CardID: cardID })))) {
        item = _.findWhere(cards, { CardID: cardID });
      }
    });
    const alert = await this.alertController.create({
      header: 'Editar',
      cssClass: 'buttonCss',
      inputs: [
        {
          name: '',
          id: 'CardName',
          type: 'text',
          placeholder: 'Cambiar nombre de la tarjeta'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel'
        }, {
          text: 'Guardar',
          cssClass: 'success',
          handler: name => {
            item.Name = _.values(name)[0];
            this.storageService.updateCard(item).then(() => {
              this.getData();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async btnDeleteCard(cardID) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: `Estas seguro que quieres eliminar esta tarjeta ${cardID}.`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel'
        },
        {
          text: 'Si, bórralo',
          cssClass: 'success',
          handler: () => {
            this.storageService.deleteCard(cardID).then(() => {
              this.getData();
            })
          }
        }
      ]
    });
    await alert.present();
  }
}