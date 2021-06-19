import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  tour:any = {};
  request: any = { Language: 'romainian'};
  day_after_tomorrow: string;
  two_years_later: string;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) { 
    this.tour = navParams.data;
  }


  ngOnInit() {
    // start date - at the earliest the day after tomorrow
  let today = new Date();
  let day_after_tomorrow 
    = new Date(today.getTime() + 1000*60*60*24*2);
  this.day_after_tomorrow 
    = day_after_tomorrow.toISOString().slice(0, 10);
 
 

// end date - at the latest in two years
  let two_years_later 
   = new Date(day_after_tomorrow.getTime() 
     + 1000*60*60*24*365*2);
  this.two_years_later = two_years_later.toISOString().slice(0, 10);
  
 }
 // user clicked 'Send request'
  send() {
    this.confirm();
  console.log('Requested tour for', 
  this.request.Date, 
  this.request.Time);

  console.log('by', this.request.LastName,
                    this.request.FirstName,
                    this.request.Email);
  }

  //utilizatorul apasa "Anuleaza"
  cancel() {
    this.modalCtrl.dismiss();
  }

  async confirm() {
    const toast = await this.toastCtrl.create({
    message: 'Vă mulțumim pentru cerere!<br> Vă vom contacta cât mai repede pe email.',
    duration: 3500
    });
    toast.present();
  }

}


