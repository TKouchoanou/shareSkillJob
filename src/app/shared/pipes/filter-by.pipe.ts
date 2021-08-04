import { Pipe, PipeTransform } from '@angular/core';
import {Job} from "../interfaces/job.interface"
import {JobsFilters} from "../interfaces/jobFilter.interface";
@Pipe({
  name: 'filterBy',
  //greedy
  pure:false
})
export class FilterByPipe implements PipeTransform {

  transform(jobs:Job[],filters:JobsFilters):Job[]  {
   for(let filter of filters){
     jobs=filter.filterFn(jobs);
   }
   return  jobs;
  }

}
