import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  page$ :BehaviorSubject<Page> = new BehaviorSubject<Page>({start:0,end:10});
  paginate(start:number,end:number){
    this.page$.next({start:start,end:end});
  }

}
