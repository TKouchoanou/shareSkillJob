import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {JobFormComponent} from "../../jobs/job-form/job-form.component";

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveFormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: JobFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean  {
    return component.canLeave();
  }

}
