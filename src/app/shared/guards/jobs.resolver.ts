import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {Job} from "../interfaces/job.interface";
import {JobsService} from "../services/jobs.service";
import {catchError, first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobsResolver implements Resolve<Job> {
  constructor(private service: JobsService,private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job> {
    return this.service.getJob(route.paramMap.get('index')).pipe(catchError(this.errorHandler),first());
  }
  get errorHandler(){
    return err =>{
      console.error(err);
      alert("you are trying to acess to not existing job");
      this.router.navigate(['/']);
      return throwError(err);
    }
  }
}
