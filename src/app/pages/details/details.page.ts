import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApuseniTripsService } from 'src/app/services/apuseni-trips.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { RequestPage } from '../request/request.page';
import _ from 'lodash';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  tour=null;
  isFavorite:boolean;
  region: string;
  tourtype: string;
  showSocial: boolean;
  constructor(private activatedRoute:ActivatedRoute,
              public atService:ApuseniTripsService,
              public favService:FavoritesService,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.atService.tours, ['ID', parseInt(id)]);
    this.isFavorite = this.favService.favIDs.indexOf(parseInt(id)) != -1;
    // this.region = _.find(
    //   this.atService.regions,
    //   { 'ID': this.tour.Region }
    // ).Name;
    this.tourtype = _.find(
      this.atService.tourtypes,
      { 'ID': this.tour.Tourtype}
    ).Name;
  }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tour',
      buttons: [
        {
          text: 'Fa o cerere',
          handler: () => {
            this.presentModal();
            // window.location.href = "/request";
          }
        },

        {
          text: (this.isFavorite) ? 'Sterge de la Favorite'
                                  : 'Adauga la Favorite',
          role: (this.isFavorite) ? 'destructive' : '',
          handler: () => {
            if (this.isFavorite) {
              this.presentAlert();
              // this.favService.remove(this.tour);
              // this.isFavorite = false;
            } else {
              this.favService.add(this.tour);
              this.isFavorite = true;
            }
          }
        },
        {
          text: 'Anuleaza',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Stergere din Favorite',
      message: 'Sigur vrei sa stergi de la Favorite?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.favService.remove(this.tour);
            this.isFavorite = false;
          }
        }
      ]
    });
    await alert.present();
  }

  //cand userul apasa pe butonul de share
  toggleSocial() {
    this.showSocial = !this.showSocial;
  }

  //cand utilizatorul apasa pe unul dintre butoanele de social-media
  openSocial(app) {
    console.log('Utilizatorul vrea sa impărtăsească turul prin ' + app + '!');
  }

  //cand utilizatorul apasa butonul "cerere"
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: this.tour
    });
    modal.present();
  }

}
