import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { spyOnClass } from 'jasmine-es6-spies';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { IHome } from 'src/app/interfaces/IHome';
declare var require: any;//Solve the problem of require

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: DataService;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers: [
        { 
          provide: DataService, 
          useFactory: () => spyOnClass(DataService) 
        },
        {
          provide: DialogService,
          useFactory: () => spyOnClass(DialogService)
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    dialogService = TestBed.inject(DialogService);

    // const homesObMock = of(//Observable que será retorando quando getHome$ é retornado
    //   [
    //     {
    //       title: 'Home 1',
    //       image: 'assets/listing.png',
    //       location: 'New York'
    //     },
    //     {
    //       title: 'Home 2',
    //       image: 'assets/listing.png',
    //       location: 'Boston'
    //     },
    //     {
    //       title: 'Home 3',
    //       image: 'assets/listing.png',
    //       location: 'Chicago'
    //     },
    //   ]);

    const homesObMock = of(<IHome[]>require('../../../assets/homes.json'));

    
    dataService.getHomes$ = jasmine.createSpy().and.returnValue(homesObMock);

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

  it('should show Book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  })

  it('should use dialog service to open a dialog when clicking on Book button', () => {
    // grab the button to click
    const bookButton = fixture.nativeElement.querySelector('[data-test="home"] button');

    // click the button
    bookButton.click();

    // assert that the dialog service was used to open a dialog
    expect(dialogService.open).toHaveBeenCalled();
    
  });
});
