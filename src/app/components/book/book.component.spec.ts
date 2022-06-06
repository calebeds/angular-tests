import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { IHome } from '../../interfaces/IHome';

import { BookComponent } from './book.component';
// import * as homesMock from '../../../assets/homes.json';

declare var require: any;//Solve the problem of require

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dataService: DataService;
  let dialogRef: MatDialogRef<BookComponent>;
  let snackBar: MatSnackBar;
  let dialogData: {home: IHome};

  const el = (selector: string) => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ BookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: DataService, useValue: () => spyOnClass(DataService) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);

    dialogData = TestBed.inject(MAT_DIALOG_DATA);
    const homes = <IHome[]>require('../../../assets/homes.json');
    dialogData.home = homes[0];

    dataService = TestBed.inject(DataService);
    dataService.bookHome$ = jasmine.createSpy().and.returnValue(of(null));

    dialogRef = TestBed.inject(MatDialogRef);
    dialogRef.close = jasmine.createSpy();

    snackBar = TestBed.inject(MatSnackBar);
    snackBar.open = jasmine.createSpy();

    component = fixture.componentInstance;

   
    fixture.detectChanges();
  });
  
  it('should show title', () => {
    expect(el('[data-test="title"]').textContent).toContain('Book Home 1');
  });

  // should show price
  it('should show price', () => {
    expect(el('[data-test="price"]').textContent).toContain('$125 per night');
  });

  it('should show check in date field', () => {
    expect(el('[data-test="check-in"]')).toBeTruthy();
  });

  it('should show check out date field', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });

  it('should show total', () => {
    
    // user enters check in date: 2023-01-10
    const checkInInput = el('[data-test="check-in"] input');
    checkInInput.value = '2023-01-10';
    checkInInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // user enters check out date: 2023-01-11
    const checkOutInput = el('[data-test="check-out"] input');
    checkOutInput.value = '2023-01-13';
    checkOutInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // assert that the total shows 3x125=375
    expect(el('[data-test="total"]').textContent).toContain('Total: $375');
  });

  it('should book home after clicking the Book button', () => {
    // user enters check in date: 2023-01-10
    const checkInInput = el('[data-test="check-in"] input');
    checkInInput.value = '2023-01-10';
    checkInInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // user enters check out date: 2023-01-11
    const checkOutInput = el('[data-test="check-out"] input');
    checkOutInput.value = '2023-01-13';
    checkOutInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // click in the Book
    const bookButton = el('[data-test="book-btn"] button');
    bookButton.click();

    

    // assert that the data service was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notification after clicking Book button', () => {
    // user enters check in date: 2023-01-10
    const checkInInput = el('[data-test="check-in"] input');
    checkInInput.value = '2023-01-10';
    checkInInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // user enters check out date: 2023-01-11
    const checkOutInput = el('[data-test="check-out"] input');
    checkOutInput.value = '2023-01-13';
    checkOutInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // click in the Book
    const bookButton = el('[data-test="book-btn"] button');
    bookButton.click();

    expect(dialogRef.close).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalled();
  });

});
