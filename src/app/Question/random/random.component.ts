import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  title = "Random Question";
  uuid: string;
  question: any;

  constructor(private cookieService: CookieService, private questionService: QuestionService) { }

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
      console.log(data);
    });
  }

  generateNewUUID() {
    this.generateUUID();
    this.getUUID();
    window.alert("Your new UUID is: " + this.uuid);
  }
}
