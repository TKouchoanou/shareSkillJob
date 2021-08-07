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
import {JobDetailComponent} from "./jobs/job-detail/job-detail.component";
import { MenuComponent } from './menu/menu.component';

const APP_ROOT:Routes=[{path:'jobs',component:JobContainerComponent},
                        {path:'job/:index/edit', component:JobFormComponent},
                        {path:'job/new', component:JobFormComponent,pathMatch:'full'},
                        {path:'job/:index', component:JobDetailComponent} ,
                        {path:'',redirectTo:'jobs',pathMatch:'full'} ]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
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
