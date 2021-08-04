import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule }   from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import {JobsModule} from "./jobs/jobs.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import {RouterModule, Routes} from "@angular/router";
import {JobContainerComponent} from "./jobs/job-container/job-container.component";
import {JobFormComponent} from "./jobs/job-form/job-form.component";

const APP_ROOT:Routes=[{path:'jobs',component:JobContainerComponent},
                       {path:'new', component:JobFormComponent},
                       {path:'',redirectTo:'jobs',pathMatch:'full'} ]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgbModule, FormsModule, JobsModule, HttpClientModule,RouterModule.forRoot(APP_ROOT)
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
