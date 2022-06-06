import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHome } from '../interfaces/IHome';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$() {
    //TODO add a real http call to get home.
    return this.httpClient.get<IHome[]>('assets/homes.json');
  }

  bookHome$(): Observable<unknown> {
  return this.httpClient.post<unknown>('https://run.mocky.io/v3/86c11442-794b-44f5-b2f9-d8a79212cb08', {});
  }
}
