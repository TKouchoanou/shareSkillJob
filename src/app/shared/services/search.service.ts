import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Job} from "../interfaces/job.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchs$ :BehaviorSubject<string> = new BehaviorSubject<string>("");
  searchChange(q:string){
    this.searchs$.next(q);
  }

  filter(jobs:Job[]){
    return  jobs.filter((job)=>{
      let jobstring = job.company +job.field+job.type+job.adresse+job.descriptionJob+job.descriptionProfil+job.salary+job.title+job.town+job.skills.join(' ');
      return jobstring.toLocaleLowerCase().includes(this.searchs$.value.toLocaleLowerCase())
    });
  }

}
