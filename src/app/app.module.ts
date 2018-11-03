import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule, Overlay } from "@angular/cdk/overlay";

import { AppComponent } from './app.component';
import { QuestionComponent } from './Question/question/question.component';
import { QuestionService } from './Question/question.service';
import { NavigatorComponent } from './navigator/navigator.component';
import { RandomComponent } from './Question/random/random.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialog, MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './Dialog/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './Dialog/alert-dialog/alert-dialog.component';
import { CreateQuestionComponent } from './Question/create-question/create-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    NavigatorComponent,
    RandomComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    CreateQuestionComponent
  ],
  entryComponents:[
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    OverlayModule,
    RouterModule.forRoot(
      [
        { path: 'questions', component: QuestionComponent },
        { path: 'random', component: RandomComponent }
      ]
    )
  ],
  providers: [QuestionService, CookieService, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
