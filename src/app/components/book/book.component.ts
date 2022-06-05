import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHome } from '../../interfaces/IHome';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {home: IHome}) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
