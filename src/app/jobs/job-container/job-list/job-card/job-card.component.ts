import { Component, Input } from '@angular/core';
import {Job} from "../../../../shared/interfaces/job.interface";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent  {
@Input('job') job:Job;

}
