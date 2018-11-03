import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';
import { QuestionService } from '../question.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from 'src/app/Dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  title = "Random Question";
  uuid: string;
  question: any = {};
  answer: any;

  constructor(private cookieService: CookieService, private questionService: QuestionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUUID();
    this.getQuestion();
  }

  generateUUID() {
    this.cookieService.set("uuid", UUID.UUID());
  }

  getUUID() {
    if (!this.cookieService.check("uuid"))
      this.generateUUID();
    this.uuid = this.cookieService.get("uuid");
  }

  getQuestion() {
    this.questionService.getRandom(this.uuid).subscribe((data: any) => {
      this.question = data;
      if (this.question == null)
        return;
      if (this.question.type === "Trivia" || this.question.type === "Poll")
        this.answer = "";
      else {
        this.answer = new Array(this.question.options.split('\n').length);
        this.answer.fill("");
      }
      // console.log(this.answer);
    });
  }

  generateNewUUID() {
    this.generateUUID();
    this.getUUID();

    this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: `Your new UUID is ${this.cookieService.get("uuid")}` } });
  }

  setAnswer(val) {
    this.answer = val;
    console.log(this.answer);
  }

  setCheckAnswerIndex(idx, val) {
    if (this.answer[idx] == "")
      this.answer[idx] = val;
    else
      this.answer[idx] = "";
    console.log(this.answer);
  }

  setRadioAnswerIndex(idx, val) {
    this.answer[idx] = val;
    console.log(this.answer);
  }

  validate() {
    if (this.question.type === "Trivia" || this.question.type === "Poll")
      return this.answer == "";
    if (this.question.type === "Checkbox") {
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer[i] !== "")
          return false;
      }
      return true;
    }
    if (this.question.type === "Matrix") {
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer[i] === "")
          return true;
      }
      return false;
    }
  }

  submit() {
    let record: any = {};
    record.uuid = this.uuid;
    if (this.question.type === "Trivia" || this.question.type === "Poll")
      record.answer = this.answer;
    else {
      record.answer = "";
      for (let i = 0; i < this.answer.length; i++)
        record.answer += this.answer[i] + "\n";
      record.answer.trim();
    }

    this.questionService.answer(this.question.id, record).subscribe((data: any) => {
      this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: "Post successfully!!!" } });
      this.getQuestion();
    }, (error: any) => {
      this.dialog.open(AlertDialogComponent, { data: { title: "Information", content: "Something wrong happened!!!\nPlease try again." } });
    });
  }
}
