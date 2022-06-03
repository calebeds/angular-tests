import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { IHome } from './interfaces/IHome';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  homes = new BehaviorSubject<IHome[]>([]);
  homes$ = this.homes.asObservable();


  constructor() { }

  ngOnInit(): void {
    // this.homes$ = this.dataService.getHomes$();
    this.homes$ = of([ //Mocks
      {
        title: 'Home 1',
        image: 'assets/listing.jpg',
        location: 'New York'
      },
      {
        title: 'Home 2',
        image: 'assets/listing.jpg',
        location: 'Boston'
      },
      {
        title: 'Home 3',
        image: 'assets/listing.jpg',
        location: 'Chicagp'
      },
    ]);
  }

}
