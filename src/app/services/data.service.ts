import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHome } from '../components/homes/interfaces/IHome';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$() {
    //TODO add a real http call to get home.
    return this.httpClient.get<IHome[]>('assets/homes.json');
  }
}
