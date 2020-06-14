import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'warehouseQueen', alias: 'translate'}}]
})
export class CommentDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
