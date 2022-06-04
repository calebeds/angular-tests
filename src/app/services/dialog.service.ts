import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  open(dialogComponent: ComponentType<unknown>, info: {}) {
    this.dialog.open(dialogComponent, info);
  }
}
