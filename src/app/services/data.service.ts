import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getHomes$() {
    //TODO add a real http call to get home.
    return of([]);
  }
}
