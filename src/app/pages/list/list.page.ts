import { Component, OnInit } from '@angular/core';
import { ApuseniTripsService } from 'src/app/services/apuseni-trips.service';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  tours: any;
  selection: any;
  constructor(private atService: ApuseniTripsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.selection = this.activatedRoute.snapshot.params;
    let category = this.selection.Category;
    let criteria = this.selection.Criteria;
    this.tours = _.filter(
      this.atService.tours,
      [ category, criteria]
    );
  }

  //Utilizatorul tasteaza ceva in bara de cautare
  search(ev) {
 
    let searchText = ev.detail.value;
    
    // primul filtru in functie de categorie & criteriu
    this.tours = _.filter(this.atService.tours, 
                          [this.selection.Category, 
                          this.selection.Criteria]); 
    // al doilea filtru in functie de textul introdus (!=0)
    if (searchText != '') {
      this.tours = this.tours.filter((tour) => {
        return (tour.Title.toLowerCase()
                .indexOf(searchText.toLowerCase()) > -1);
        }); 
      }
    }

}
