import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from './favorites.service';
import { LoadingController } from '@ionic/angular';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApuseniTripsService {

  public regions: any;
  public tourtypes: any;
  public tours: any;
  public all_tours: any;

  baseUrl = 'https://apuseni-trips-app-default-rtdb.europe-west1.firebasedatabase.app/';
  
  constructor(private http:HttpClient,
              public favService: FavoritesService,
              private loadingCtrl: LoadingController) { }

  async initialize() {
    const loading = await this.loadingCtrl.create({
      message: 'Încărcare date traseu...',
      spinner: 'crescent'
    });
    await loading.present();
    await this.getRegions()
    .then(data => this.regions = data);
    await this.getTourtypes()
    .then(data => this. tourtypes = _.sortBy(data, 'Name'));
    await this.getTours()
    .then(data => {
    this.tours = _.sortBy(data, 'Title');
    this.all_tours = _.sortBy(data, 'Title');
    this.favService.initialize(this.all_tours);
    });
    await loading.dismiss();
  }

  getRegions() {
    let requestUrl = `${this.baseUrl}/Regions.json`;
    return this.http.get(requestUrl).toPromise();
  }

  getTourtypes(){
    let requestUrl = `${this.baseUrl}/Tourtypes.json`;
    return this.http.get(requestUrl).toPromise();
  }

  getTours() {
    let requestUrl = `${this.baseUrl}/Tours.json`;
    return this.http.get(requestUrl).toPromise();
  }

  //Filtrare trasee dupa pret
  filterTours(price):number {
    this.tours = _.filter(this.all_tours, function(tour) {
    return tour.PriceR >= price.lower 
    && tour.PriceR <= price.upper;
    });
    return this.tours.length;
    }
}
