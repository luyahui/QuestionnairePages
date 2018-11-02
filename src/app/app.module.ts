import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionComponent } from './Question/question/question.component';
import { QuestionService } from './Question/question.service';
import { NavigatorComponent } from './navigator/navigator.component';
import { RandomComponent } from './Question/random/random.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    NavigatorComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: 'questions', component: QuestionComponent },
        { path: 'random', component: RandomComponent }
      ]
    )
  ],
  providers: [QuestionService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
