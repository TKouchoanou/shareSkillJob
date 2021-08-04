import { Component, Input,Output,EventEmitter} from '@angular/core';
import {PaginatorService} from "../../../shared/services/paginator.service";
//import {Page}  from "../../../shared/interfaces/page.interface";
interface Page {
  start:number;
  end:number;
}


@Component({
  selector: 'app-job-paginator',
  templateUrl: './job-paginator.component.html',
  styleUrls: ['./job-paginator.component.scss']
})
export class JobPaginatorComponent {
  currentPage = 1;
  pageSize = 4;
  @Input('size') collectionSize!: number;
  constructor(private paginatorService:PaginatorService) {
  }

   paginate (){
     let start= (this.currentPage - 1) * this.pageSize;
     let end = (this.currentPage - 1) * this.pageSize + this.pageSize;
     this.paginatorService.paginate(start,end);
   }
}
