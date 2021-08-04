import { Pipe, PipeTransform } from '@angular/core';
import {Job} from "../interfaces/job.interface"

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(jobs:Job[],criteria:string,asc=true): Job[] {

    if (criteria && jobs.length > 0) {
      let criteriaType = typeof jobs[0][criteria];

      if (criteriaType === "string") {
        jobs = jobs.sort((job1, job2) => {
          return job1[criteria].localeCompare(job2[criteria]);
        });
      }
      if (criteriaType === "number") {
        jobs = jobs.sort((job1, job2) => {
          return job1[criteria] - job2[criteria];
        });
      }
      if (criteriaType === "object" && criteria == "pubDate") {
        jobs = jobs.sort((job1, job2) => {
          return job1[criteria].getTime() - job2[criteria].getTime();
        });
      }
      if (!asc) {
        jobs.reverse();
      }

  }
    return jobs;
  }

}
