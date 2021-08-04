import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../../shared/interfaces/job.interface";

@Component({
  selector: 'app-job-row',
  templateUrl: './job-row.component.html',
  styleUrls: ['./job-row.component.scss']
})
export class JobRowComponent  {
  @Input('job') job:Job;

}
