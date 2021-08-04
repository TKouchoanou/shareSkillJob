import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-job-order',
  templateUrl: './job-order.component.html',
  styleUrls: ['./job-order.component.scss']
})
export class JobOrderComponent  {
  sortCriterias: string[]=["title", "pubDate", "salary"];
  @Output('sort') sortCriteria: EventEmitter<string>= new EventEmitter<string>();
  @Input() numfound: number;


  onSort(criteria: string) {
    this.sortCriteria.emit(criteria);
  }

}
