import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  // tours = [
  //   { ID: 1, Title: 'Plimbarica'},
  //   { ID: 2, Title: 'Pe urmele lui Eminescu'},
  //   { ID: 3, Title: 'Casuta lui Creanga'}
  // ];
  constructor(public favService: FavoritesService) { }

  ngOnInit() {
  }

}
