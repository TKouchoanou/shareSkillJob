import { Component,OnInit } from '@angular/core';
import { JobsFilters } from "../../../shared/interfaces/jobFilter.interface";
import {FilterService} from "../../../shared/services/filter.service";
import {Observable} from "rxjs";
import {Filter} from "../../../shared/filter/job/abstract.job.filter";
@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {
  filters$!: Observable<JobsFilters>;

   constructor(private filterService:FilterService) {
     console.log(Filter.create());
   }

   onSelect(i:number,j:number) {
     alert(i+' '+j);
   this.filterService.filter(i,j);
  }

  ngOnInit(): void {
    this.filters$=this.filterService.filter$;
  }

}
