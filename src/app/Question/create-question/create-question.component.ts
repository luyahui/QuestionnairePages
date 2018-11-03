import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  questionTypes = ["Trivia", "Poll", "Checkbox", "Matrix"];
  question: any = {};

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.question = this.data.question;
  }

  validate() {
    return this.question.type == null || this.question.description == null || this.question.options == null;
  }

  cancelAndClose() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.question);
  }
}
