import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InformationCardModel } from 'src/models/storage.model';
import * as _ from 'underscore';
import { ToastController } from '@ionic/angular';

const CARDS = 'cards';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) { }

  async addCard(cardInformation: InformationCardModel) {
    return await this.storage.get(CARDS).then((cardItem: InformationCardModel[]) => {
      if (_.isObject(_.findWhere(cardItem, { CardID: cardInformation.CardID })) && !_.isNull(_.isObject(_.findWhere(cardItem, { CardID: cardInformation.CardID })))) {
        this.alerCardID();
      } else {
        if (cardItem) {
          cardItem.push(cardInformation);
          this.saveSuccess();
          return this.storage.set(CARDS, cardItem);
        } else {
          this.saveSuccess();
          return this.storage.set(CARDS, [cardInformation]);
        }
      }
    });
  }
  async getCards(): Promise<InformationCardModel[]> {
    return await this.storage.get(CARDS);
  }

  async saveSuccess() {
    const toast = await this.toastController.create({
      message: 'Guardado Exitoso!',
      color: 'success',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    toast.present();
  }
  async alerCardID() {
    const toast = await this.toastController.create({
      header: 'Chuuzo!',
      message: 'Parece que la tarjeta ya existe, revisa en Tarjetas Guardadas.',
      position: 'bottom',
      color: 'warning',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    toast.present();
  }

  async updateCard(card: InformationCardModel): Promise<InformationCardModel> {
    return await this.storage.get(CARDS).then((cardItem: InformationCardModel[]) => {
      if (!cardItem || cardItem.length === 0) {
        return null;
      }
      let newCards: InformationCardModel[] = [];
      _.each(cardItem, item => {
        if (item.CardID === card.CardID) {
          newCards.push(card);
        } else {
          newCards.push(item);
        }
      });
      return this.storage.set(CARDS, newCards);
    })
  }

  async deleteCard(cardID: string): Promise<InformationCardModel> {
    return await this.storage.get(CARDS).then((cardItem: InformationCardModel[]) => {
      if (!cardItem || cardItem.length === 0) {
        return null
      } else {
        let toKeep = [];
        _.each(cardItem, item => {
          if (item.CardID !== cardID) {
            toKeep.push(item);
          }
        })
        return this.storage.set(CARDS, toKeep);
      }
    })
  }
}