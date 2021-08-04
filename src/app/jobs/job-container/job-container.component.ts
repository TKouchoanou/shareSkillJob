import { Component, OnInit } from '@angular/core';
import {JobsService} from "../../shared/services/jobs.service";
import {Observable} from "rxjs";
import {Job} from "../../shared/interfaces/job.interface";

@Component({
  selector: 'app-job-container',
  templateUrl: './job-container.component.html',
  styleUrls: ['./job-container.component.scss']
})
export class JobContainerComponent implements OnInit {
 jobs$!:Observable<Job[]>;
  constructor(private JobService:JobsService) { }

  ngOnInit(): void {
    this.jobs$=this.JobService.jobs$;
  }

}
