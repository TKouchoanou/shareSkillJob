import { Component, OnInit } from '@angular/core';
import {Job} from "../../shared/interfaces/job.interface";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {JobsService} from "../../shared/services/jobs.service";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit  {
      job!:Job;
      src:string="https://www.lessor42.fr/content/images/2021/05/25/26874/recruitment-opportunity-employment-career-people-background-1568213-pxhere.com.jpg";

  constructor(private router: Router,private activatedRoute:ActivatedRoute,private jobService:JobsService) {
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data)=>{this.job=data.job});
  }

  delete() {
    this.jobService.remove(this.job.id);
    this.jobService.flush();
    this.router.navigate(["/"]);
  }
}
