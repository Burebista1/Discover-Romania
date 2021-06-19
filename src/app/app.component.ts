import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { ApuseniTripsService } from './services/apuseni-trips.service';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title:'Parcul Natural Apuseni', url:'/regions', icon:'images'},
    {title:'Favorite', url:'/favorites', icon:'star'},
    {title:'Trasee pe județe', url:'/tour-types', icon:'planet'},
    {title:'Descoperă România', url:'/slideshow', icon:'play'}
  ];
  settings: any = {};
  price: any = { lower: 10, upper:200};
  hits: number = 24;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    public atService: ApuseniTripsService,
    private popoverCtrl: PopoverController 
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.atService.initialize();
    });
  }
  // Utilizatorul isi schimba setarile
  updateSettings() {
    console.log(this.settings.notifications);
  }

  // Utilizatorul a apasat pe "Despre aplicatie"
  async about() {
    const popover = await this.popoverCtrl.create({
      component: AboutComponent,
      translucent: true
    });
    await popover.present();
  }

  //Utilizatorul schimba raza pretului
  filterByPrice() {
    this.hits = this.atService.filterTours(this.price);
    }
   
  ngOnInit() {}
}
