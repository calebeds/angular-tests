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

  const el = (selector: string) => {
    return fixture.nativeElement.querySelector(selector);
  };

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
    expect(el('[data-test="title"]').textContent).toContain('Home 1');
  });

  // should show price
  it('should show price', () => {
    expect(el('[data-test="price"]').textContent).toContain('125');
  });

  it('should show check in date field', () => {
    expect(el('[data-test="check-in"]')).toBeTruthy();
  });

  it('should show check out date field', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });
  
  // should show total
  // should book home after clicking the Bookbutton

});
