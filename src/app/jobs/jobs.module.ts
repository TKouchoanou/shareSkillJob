import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';


import { SizePipe } from '../shared/pipes/size.pipe';



import { JobContainerComponent } from './job-container/job-container.component';
import { JobListComponent } from './job-container/job-list/job-list.component';
import { JobsCardComponent } from './job-container/job-list/jobs-card/jobs-card.component';
import { JobsRowComponent } from './job-container/job-list/jobs-row/jobs-row.component';
import { JobRowComponent } from './job-container/job-list/job-row/job-row.component';
import { JobCardComponent } from './job-container/job-list/job-card/job-card.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobFilterComponent } from './job-container/job-filter/job-filter.component';
import { JobSearchComponent } from './job-container/job-search/job-search.component';
import { JobPaginatorComponent } from './job-container/job-paginator/job-paginator.component';
import {JobsService} from "../shared/services/jobs.service";
import {FilterService} from "../shared/services/filter.service";
import { JobOrderComponent } from './job-container/job-order/job-order.component';
import {PaginatePipe} from "../shared/pipes/paginate.pipe";
import {TostrPipe} from "../shared/pipes/tostr.pipe";
import {FilterByPipe} from "../shared/pipes/filter-by.pipe";
import {SortByPipe} from "../shared/pipes/sort-by.pipe";
import {Route, RouterModule} from "@angular/router";

const JOB_ROUTES:Route[]=[
  {path:'',component:JobContainerComponent,pathMatch:'full'},
  {path:'new',component:JobContainerComponent,pathMatch:'full'},
]
  //RouterModule.forChild(JOB_ROUTES)
@NgModule({
  declarations: [
    JobContainerComponent,
    JobListComponent,
    JobsCardComponent,
    JobsRowComponent,
    JobRowComponent,
    JobCardComponent,
    JobDetailComponent,
    JobFormComponent,
    JobFilterComponent,
    JobSearchComponent,
    JobPaginatorComponent,
    JobOrderComponent,
    SizePipe,
    PaginatePipe,
    TostrPipe,
    FilterByPipe,
    SortByPipe,
  ],
  imports: [
    CommonModule, NgbModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports :[JobContainerComponent,JobFormComponent],
  providers:[JobsService,FilterService]
})
export class JobsModule { }
