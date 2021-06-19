import { Component, OnInit } from '@angular/core';
import { ApuseniTripsService } from 'src/app/services/apuseni-trips.service';
import _ from 'lodash';

@Component({
  selector: 'app-tour-types',
  templateUrl: './tour-types.page.html',
  styleUrls: ['./tour-types.page.scss'],
})
export class TourTypesPage implements OnInit {

  tourtypes: any;
  constructor(private atService:ApuseniTripsService) { }

  ngOnInit() {
    this.tourtypes = this.atService.tourtypes;
    this.tourtypes.forEach(tourtype => {
      const tours = _.filter(this.atService.tours,
                            ['Tourtype',tourtype.ID]);
      tourtype['Count'] = tours.length;
    });
  }

}
