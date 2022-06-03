import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {
  let httpClient: HttpClient;
  let dataService: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return the of homes', () => {

    // Spy on and mock the HttpClient.
    httpClient = TestBed.inject(HttpClient);
    const homesMock = [
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
        location: 'Chicago'
      },
    ];
    
    spyOn(httpClient, 'get').and.returnValue(of(homesMock));

    // Use our service to get homes.
    dataService = TestBed.inject(DataService);
    const spy = jasmine.createSpy('spy');
    dataService.getHomes$().subscribe(spy);

    // Verify that the service returned mocked data.
    expect(spy).toHaveBeenCalledWith(homesMock);

    // Verify that the service called a proper HTTP endpoint
    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
  });
});
