import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { IHome } from '../../interfaces/IHome';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  checkIn = '';
  checkOut = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {home: IHome},
    public dataService: DataService,
    public dialogRef: MatDialogRef<BookComponent>,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  calculateTotal(): number | string {
    // console.log(this.checkIn, this.checkOut);

    // find the difference between the dates which will give number of nigths.
    const dateCheckIn = moment(this.checkIn, 'DD-MM-YYYY');
    const dateCheckOut = moment(this.checkOut, 'DD-MM-YYYY');
    const nights = dateCheckOut.diff(dateCheckIn, 'days');

    // multiply the number of nights by the price
    const total = nights * this.data.home.price;

    // return the total
    if(total.toString() === 'NaN' || total === null || total < 0) 
      return '--';
    else 
      return total;
    
  }

  bookHome() {
    this.dataService.bookHome$().subscribe(() => {
      this.dialogRef.close();
      this._snackBar.open('Home booked!', 'Close', { duration: 3000});
    });
    
  }

}
