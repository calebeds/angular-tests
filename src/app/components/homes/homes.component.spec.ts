import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { spyOnClass } from 'jasmine-es6-spies';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;

    const stubValue = of(//Observable que será retorando quando getHome$ é retornado
      [
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
      ]);

    dataService = TestBed.inject(DataService);
    dataService.getHomes$ = jasmine.createSpy().and.returnValue(stubValue);

    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test = "title"]').innerText).toEqual('Home 1');
    expect(home.querySelector('[data-test = "location"]').innerText).toEqual('New York');
    expect(home.querySelector('[data-test = "image"]')).toBeTruthy();
  });
});
