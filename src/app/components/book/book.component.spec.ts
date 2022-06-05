import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHome } from '../../interfaces/IHome';

import { BookComponent } from './book.component';
// import * as homesMock from '../../../assets/homes.json';

declare var require: any;//Solve the problem of require

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: {home: IHome};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.inject(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    const homes = <IHome[]>require('../../../assets/homes.json');
    console.log(homes);
    dialogData.home = homes[0];
    fixture.detectChanges();
  });
  
  it('should show title', () => {
    expect(fixture.nativeElement.querySelector('[data-test="title"]').textContent).toContain('Home 1');
  });

  // should show price



  // should show check in date field
  // should show check out date field
  // should show total
  // should book home after clicking the Bookbutton

});
