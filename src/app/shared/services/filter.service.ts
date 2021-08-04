import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {JobFilter} from "../interfaces/jobFilter.interface";
import {Filter} from "../filter/job/abstract.job.filter";
import {Job} from "../interfaces/job.interface";


@Injectable({
  providedIn: 'root'
})
export class FilterService {
   filters$ :BehaviorSubject<JobFilter[]> = new BehaviorSubject<JobFilter[]>(Filter.create());
  filtersChange(i:number, j:number){
    let filters=this.filters$.value;
    filters[i].values.updateFn(j);
    this.filters$.next(filters);
  }

  applyFilters(jobs:Job[]){
    for(let filter of this.filters$.value){
      jobs=filter.filterFn(jobs);
    }
    return  jobs;
  }

}
