import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule }   from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import {JobsModule} from "./jobs/jobs.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PaginatePipe } from './shared/pipes/paginate.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { FilterByPipe } from './shared/pipes/filter-by.pipe';
import { SortByPipe } from './shared/pipes/sort-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PaginatePipe,
    SearchPipe,
    FilterByPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule, NgbModule, FormsModule, JobsModule, HttpClientModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
