import { Component, OnInit } from '@angular/core';
import { ApuseniTripsService } from 'src/app/services/apuseni-trips.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.page.html',
  styleUrls: ['./slideshow.page.scss'],
})
export class SlideshowPage implements OnInit {

  sliderConfig = {
    centeredSlides: true,
    autoplay: {delay: 3000},
    loop: true
  };
  constructor(public atService:ApuseniTripsService) { }

  ngOnInit() {
  }

  manageFavorites(tour) {
    if (!tour.isFavorite) {
    this.atService.favService.add(tour);
    } else {
    this.atService.favService.remove(tour);

    }
    tour.isFavorite = !tour.isFavorite;
    }
      
}
