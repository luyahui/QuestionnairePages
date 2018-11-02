import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

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

  constructor(private questionService: QuestionService) { }

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

}
