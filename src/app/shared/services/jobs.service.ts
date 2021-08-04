import { Injectable } from '@angular/core';
import {Job} from "../interfaces/job.interface";
import {BehaviorSubject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {SearchService} from "./search.service";
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  db_name = "jobs";
  /**
   * emet jobs aux components qui ont souscrire
   */
  subscription:Subscription= new Subscription();
  jobs$ :BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  untouchedJobs$:BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  sortCriteria$ :BehaviorSubject<string> = new BehaviorSubject<string>(null);

  /**
   * Fait un appel reseau pour récupérer les données
   */
  constructor(private httpClient: HttpClient,private filterService :FilterService,private searchService:SearchService ) {
    this.subscribes()
    this.fetchAll();
  }


   emit(){
     let jobs=this.filterService.applyFilters(this.untouchedJobs$.value);
     jobs = this.searchService.filter(jobs);
     this.jobs$.next(jobs);
   }


  subscribes(){
    this.subscription.add(
    this.filterService.filters$.subscribe(
      ()=>{
        this.emit();
      }
    ));
    this.subscription.add(this.searchService.searchs$.subscribe(()=>this.emit()))

    this.subscription.add(this.untouchedJobs$.subscribe((joblist)=>{
      this.emit();
    }));
  }

  /**
   * ajoute job à jobsnofilter en vue d'une
   * future sauvegarde
   */
  persist(job: Job) {
    this.untouchedJobs$.next([...this.untouchedJobs$.value,job]);
  }

  /**
   * sauvegarde les données actuellement présent dans jobsnofilters
   * dans la base de donnée doit être appelé après un persist pour
   * vraiment sauvegarder la nouvelle donnée ajouté
   */
  flush() {
    this.httpClient
      .put<Job[]>(
        "https://fir-maloprojet-default-rtdb.europe-west1.firebasedatabase.app/" +
        this.db_name +
        ".json",
        this.jobs$.value
      )
      .subscribe(
        joblist => {
          this.untouchedJobs$.next(joblist.map(job => ({...job,pubDate:new Date(job.pubDate)}))) ;
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * recupère les données de la base reinitialise jobsnofilters met à jour jobs et émet
   */
  fetchAll() {
    this.httpClient
      .get<Job[]>(
        "https://fir-maloprojet-default-rtdb.europe-west1.firebasedatabase.app/" +
        this.db_name +
        ".json"
      )
      .subscribe(
        joblist => {  console.log('retour SERVEUR');
          this.untouchedJobs$.next(joblist.map(job => ({...job,pubDate:new Date(job.pubDate)}))) ;
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * permet de paginer
   */
  sliceJobs(start: number, end: number) {
    this.jobs$.next(
      this.jobs$.value
        .map((job,i)=>({id:i+1,...job}))
        .slice(start, end)
    );
  }
}


