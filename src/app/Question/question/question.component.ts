import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog.component';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { AlertDialogComponent } from 'src/app/Dialog/alert-dialog/alert-dialog.component';

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
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Confirmation", content: "Are you sure to delete this item?" }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.questionService.delete(id).subscribe((data: any) => {
          this.questions = this.questions.filter(q => q.id !== id);
        }, (error: any) => {
          window.alert("Bad Request");
        });
      }
    });
  }

  createNew() {
    let newDialog = this.dialog.open(CreateQuestionComponent, {
      width: "40%",
      data: { title: "Add a New Question", question: {} }
    });

    newDialog.afterClosed().subscribe(question => {
      if (question == null)
        return;
      this.questionService.createNew(question).subscribe((data: any) => {
        this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: "Post successfully!!!" } });
      }, (error:any) => {
        this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: "Something wrong happened!!!" } });
      });
    });
  }

  edit(question) {
    let editDialog = this.dialog.open(CreateQuestionComponent, {
      width: "40%",
      data: {
        title: "Edit",
        question: question
      }
    });

    editDialog.afterClosed().subscribe(question => {
      if (question == null)
        return;
      
      this.questionService.update(question).subscribe((data:any) => {
        let idx = this.questions.findIndex(q => q.id === question.id);
        this.questions[idx] = question;
      }, (error:any) =>{
        this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: "Something wrong happened!!!" } });
      })
    })
  }
}
