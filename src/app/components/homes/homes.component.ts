import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BookComponent } from '../book/book.component';
import { IHome } from './interfaces/IHome';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  homes = new BehaviorSubject<IHome[]>([]);
  homes$ = this.homes.asObservable();


  constructor(
    private dataService: DataService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog() {
    this.dialogService.open(BookComponent, {
      width: '250px',
      data: {}
    });
  }
}
