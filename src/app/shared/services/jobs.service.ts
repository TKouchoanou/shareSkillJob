import { Injectable } from '@angular/core';
import {Job} from "../interfaces/job.interface";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {SearchService} from "./search.service";
import {filter, first, map} from "rxjs/operators";
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
    this.subscribes();
    this.fetchAll();
  }



   emit(){
     let newJobs=this.filterService.applyFilters(this.untouchedJobs$.value);
     newJobs = this.searchService.filter(newJobs);
     this.jobs$.next(newJobs);
   }


  /**
   * souscriptions pour rafraichir à chaque évènement nécéssitant de rafraichir : filtre,recherche..
   */
  subscribes(){
    this.subscription.add(
    this.filterService.filters$.subscribe(
      ()=>{
        this.emit();
      }
    ));
    this.subscription.add(this.searchService.searchs$.subscribe(()=>this.emit()))
    /**
     * à chaque fous d'un untouchedJob est émis on passe par la fonction emit pour emettre job rafraichit
     */
    this.subscription.add(this.untouchedJobs$.subscribe(()=>{
      this.emit();
    }));
  }

  remove(index:any){
    let values =this.untouchedJobs$.value;
    let i= values.findIndex((job)=>job.id==index);
    values.splice(i,1);
    this.untouchedJobs$.next(values);
  }

 getJob(index:any):Observable<Job>{
    if(typeof index !=null){
      return this.jobs$.pipe(filter((joblList: Job[]) =>  joblList!=[] ), map((joblist)=>joblist.find((job)=>job.id===index)))
      ;
    }
   return  this.jobs$.pipe(first((joblList: Job[]) => joblList!=[]),map((jobList)=>jobList[0]));
 }
  /**
   * ajoute job à jobsnofilter en vue d'une
   * future sauvegarde
   */
  persist(job: Job) {
    let jobid=job.id;
    if(!job.id){
      //le plus grand id +1 pour être sure d'avoir un id unique non utilisé sans me soucier s'il y a un lien entre job.id et son index dans le tableau
      job.id=jobid=this.untouchedJobs$.value.map((eachjob)=>eachjob.id).sort((id1,id2)=>id1-id2).pop()+1;
      this.untouchedJobs$.next([...this.untouchedJobs$.value,job]);
    }else {
      let values =this.untouchedJobs$.value;
      let index= values.findIndex((old)=>job.id==old.id);
     if(confirm("Voulez -vous vraiment ce job modifier ?")){
       values[index]=job;
       this.untouchedJobs$.next(values);
     }
    }
    return jobid;
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
        this.untouchedJobs$.value
      )
      .subscribe(
        joblist => {
          this.untouchedJobs$.next(joblist.map(job => ({...job,pubDate:new Date(job.pubDate)}))) ;
        },
        error => {
          console.log(error);
          alert('please reload the page');
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
      ).pipe( map((joblist)=>{
         return joblist.map((job)=>{

           if(!job.contacts.emails){
             job.contacts.emails=[];
           }
           if(!job.contacts.phones){
             job.contacts.phones=[];
           }
           return job;
         })
    }), first())
      .subscribe(
        joblist => {
          this.untouchedJobs$.next(joblist.map((job,i) => ({...job,id:i+1,pubDate:new Date(job.pubDate)}))) ;
        },
        error => {
          console.log(error);
          alert('please reload the page')
        }
      );
  }

  /**
   * permet de paginer
   */
  sliceJobs(start: number, end: number) {
    this.jobs$.next(
      this.jobs$.value.slice(start, end)
    );
  }
}


