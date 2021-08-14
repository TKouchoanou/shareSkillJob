import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JobsService} from "../services/jobs.service";

@Injectable({
  providedIn: 'root'
})
export class JobsLoadedGuard implements CanActivate {
  constructor(private service: JobsService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.service.dataIsFetched;
  }

}
