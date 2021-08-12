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
import { JobOrderComponent } from './job-container/job-order/job-order.component';
import {PaginatePipe} from "../shared/pipes/paginate.pipe";
import {TostrSkillPipe} from "../shared/pipes/tostrSkill.pipe";
import {ViewConsoleLogPipe} from "../shared/pipes/view-console-log.pipe";
import {SortByPipe} from "../shared/pipes/sort-by.pipe";
import {Route, RouterModule} from "@angular/router";
import {JobResolver} from "../shared/guards/job.resolver";
import {CanDeactiveFormGuard} from "../shared/guards/can-deactive-form.guard";
import {TkFormInputModule} from "tk-form-input";
import {FlexLayoutModule} from "@angular/flex-layout";




const JOB_ROUTES:Route[]=[{path:'',component:JobContainerComponent, children:[{path:'cards', component:JobsCardComponent},
                                                                               {path:'rows',component:JobsRowComponent},
                                                                               {path:'',redirectTo:'cards',pathMatch:'full'}]},
            {path:':index/edit', component:JobFormComponent, canDeactivate: [CanDeactiveFormGuard]},
            {path:'new', component:JobFormComponent,pathMatch:'full',canDeactivate: [CanDeactiveFormGuard]},
            {path:':index', component:JobDetailComponent,resolve: {job: JobResolver}}];

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
    TostrSkillPipe,
    ViewConsoleLogPipe,
    SortByPipe,
  ],
  imports: [
    CommonModule, NgbModule, FormsModule, ReactiveFormsModule,TkFormInputModule,FlexLayoutModule, RouterModule.forChild(JOB_ROUTES)
  ],
  exports :[JobContainerComponent,JobFormComponent,RouterModule],
  providers:[]
})
export class JobsModule { }
