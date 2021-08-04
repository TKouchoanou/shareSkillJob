import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {JobFilter} from "../interfaces/jobFilter.interface";
import {Filter} from "../filter/job/abstract.job.filter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
   filter$ :BehaviorSubject<JobFilter[]> = new BehaviorSubject<JobFilter[]>(Filter.create());
  filter(i:number,j:number){
    let filters=this.filter$.value;
    filters[i].values.updateFn(j);
    this.filter$.next(filters);
  }

}
