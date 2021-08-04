import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Job} from "../../../../shared/interfaces/job.interface";
import {JobsService} from "../../../../shared/services/jobs.service";
import {FilterService} from "../../../../shared/services/filter.service";
import {JobsFilters} from "../../../../shared/interfaces/jobFilter.interface";

@Component({
  selector: 'app-jobs-card',
  templateUrl: './jobs-card.component.html',
  styleUrls: ['./jobs-card.component.scss']
})
export class JobsCardComponent implements OnInit {
  subscription: Subscription=new Subscription();
  filters!:JobsFilters
  sortCriteria!:string
  jobs$!:Observable<Job[]>;
  constructor(private JobService:JobsService,private filterService:FilterService) { }

  ngOnInit(): void {
    this.jobs$=this.JobService.jobs$;
    this.subscription.add(this.JobService.sortCriteria$.subscribe((criteria)=>{this.sortCriteria=criteria}));
    this.subscription.add(this.filterService.filters$.subscribe((filters)=>{this.filters=filters}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
