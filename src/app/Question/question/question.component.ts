import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = "Question List";

  pageNo = 0;
  pageSize = 20;
  totalNo = 0;
  totalPages = 0;
  questions: any;

  confirmDialog: MatDialogRef<ConfirmDialogComponent>;

  constructor(private questionService: QuestionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.questionService.getAll(this.pageNo, this.pageSize).subscribe((data: any) => {
      if (data == null)
        return;
      this.totalNo = data.totalElements;
      this.totalPages = data.totalPages;
      this.questions = data.content;
    });
  }

  updatePageSize() {
    this.getAll();
  }

  increasePageNo(inc) {
    this.pageNo += inc;
    this.getAll();
  }

  delete(id) {
    this.confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Confirmation", content: "Are you sure to delete this item?" }
    });
    this.confirmDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.questionService.delete(id).subscribe((data: any) => {
          this.questions = this.questions.filter(q => q.id !== id);
        }, (error: any) => {
          window.alert("Bad Request");
        });
      }
    })

  }
}
