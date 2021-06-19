import { Component, OnInit } from '@angular/core';
import { ApuseniTripsService } from 'src/app/services/apuseni-trips.service';
import _ from 'lodash';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  regions: any;

  constructor(private atService:ApuseniTripsService) { }

  ngOnInit() {
    this.regions = this.atService.regions;
    this.regions.forEach(region => {
      const tours = 
        _.filter(this.atService.tours, ['Region', region.ID]);
        region['Count'] = tours.length;
    });
  }

}
