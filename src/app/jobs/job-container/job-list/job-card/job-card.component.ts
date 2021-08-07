import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Job} from "../../../../shared/interfaces/job.interface";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent  implements OnChanges{
@Input('job') job:Job;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.job.currentValue.id);
  }

}
