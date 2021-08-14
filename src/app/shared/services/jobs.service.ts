import { Injectable } from '@angular/core';
import {Job} from "../interfaces/job.interface";
import {BehaviorSubject, Observable, Subscription, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {SearchService} from "./search.service";
import {catchError, filter, first, map, tap} from "rxjs/operators";
const defaultJob:Job={
  title: "Angular Developer",
  salary: 4500,
  devise: "euro",
  skills: [{skill:"Angular", level:"confirmed"}],
  field: "",
  level: "confirmed",
  type: "CDI : Contract of indefinite duration",
  company: "Google",
  adresse: "75 Avenue Charles de Gaulle",
  town: "Paris",
  contacts: { emails: [], phones: ["0561454360"] },
  descriptionJob: "Lorem ipsum dolor sit amet. Sit quibusdam dolor et tempore veniam hic nemo consequatur et explicabo consequatur qui laudantium ipsum! In quae galisum rem accusantium maiores eum dolore dolor ut recusandae fuga 33 illo autem vel blanditiis expedita et voluptates iusto. Non iste voluptatem aut necessitatibus autem ad omnis voluptatem et fuga dolorum. ",
  descriptionProfil: "Non galisum pariatur et atque facere nam magnam sint non nihil expedita est autem omnis! Est possimus internos qui repudiandae distinctio eos dignissimos sequi et Quis exercitationem est impedit repellendus quo eaque quasi. Non dolore quidem eos delectus officiis ut explicabo provident a nisi quia. "
}
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private db_name = "jobs";
  public dataIsFetched: boolean=false;
  public  defaultJob:Job=defaultJob;
  private subscription:Subscription= new Subscription();
  /**
   * jobs auquels on a appliqué les filtres
   */
  jobs$ :BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  /**
   * jobs non filtrés
   */
 private untouchedJobs$:BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
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

      return this.jobs$.pipe(filter((joblList: Job[]) =>  joblList.length>0 ),
          map((joblist)=>
          {
            if(index==null){
              throw  new Error("Bad Index provide to get job"+index);
            }
            let searchJob=joblist.find((job)=>job.id==index);
            if(!searchJob){
              throw new Error("Job with id = "+index+" not found");
            }
            return searchJob;

          }))
      ;

 }

  persist(job: Job) {
    let jobid=job.id;
    //edit
    if(job.id){
      let values =this.untouchedJobs$.value;
      let index= values.findIndex((old)=>job.id==old.id);
      values[index]=job;
      this.untouchedJobs$.next(values);
    }
    //new
    else
    {
      //le plus grand id +1 pour être sure d'avoir un id unique non utilisé sans me soucier s'il y a un lien entre job.id et son index dans le tableau
      job.id=jobid=this.untouchedJobs$.value.map((eachjob)=>eachjob.id).sort((id1,id2)=>id1-id2).pop()+1;
      job.pubDate=new Date();
      this.untouchedJobs$.next([...this.untouchedJobs$.value,job]);
    }
    return jobid;
  }

  /**
   * sauvegarde les données actuellement présent dans untouchedJobs
   */
  flush() {
    this.httpClient
      .put<Job[]>(
        this.endpointurl,
        this.untouchedJobs$.value
        ).pipe(
       map(this.dataMapperFn), tap((jobs)=>this.untouchedJobs$.next(jobs) ),
       catchError(this.catchHttpErrorFn),first()
      )
      .subscribe();
  }

  /**
   * recupère les données de la base
   */
  fetchAll() {
    this.httpClient
      .get<Job[]>(
        this.endpointurl
      ).pipe( map(this.dataMapperFn),tap((jobs)=>this.untouchedJobs$.next(jobs)),catchError(this.catchHttpErrorFn), first())
      .subscribe(()=>this.dataIsFetched=true);
  }

  get dataMapperFn(){
   return  (joblist:Job[])=>{
      return joblist.map((job)=>{
        if(!job.contacts){
          job['contacts']={emails:[],phones:[]}
        }
        if(!job.contacts.emails){
          job.contacts.emails=[];
        }
        if(!job.contacts.phones){
          job.contacts.phones=[];
        }
        return {...job,pubDate:new Date(job.pubDate)};
      })
    };
  }

  get catchHttpErrorFn(){
   return  err => {
     console.error(err);
      alert('some problem with server : please reload the page');
      return throwError(err);
    }
  }

  get endpointurl(){
    return  "https://fir-maloprojet-default-rtdb.europe-west1.firebasedatabase.app/" +
      this.db_name +
      ".json";
  }

}


