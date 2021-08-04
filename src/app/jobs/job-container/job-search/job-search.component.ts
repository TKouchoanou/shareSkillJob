import { Component } from '@angular/core';
import {SearchService} from "../../../shared/services/search.service"
@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent  {
  q:string ="teacher";
  constructor(private searchService :SearchService ) {
  }
  ngDoCheck(){
    this.searchService.searchChange(this.q)
  }

}
