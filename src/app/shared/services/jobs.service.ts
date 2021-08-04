import { Injectable } from '@angular/core';
import {Job} from "../interfaces/job.interface";
import {BehaviorSubject,Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { jobs } from '../data/jobs';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  db_name = "jobs";
  /**
   * emet jobs aux components qui ont souscrire
   */
  jobs$ :BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(jobs);

  /**
   * Fait un appel reseau pour récupérer les données
   */
  constructor(private httpClient: HttpClient) {
    this.fetchAll();
  }




  /**
   * ajoute job à jobsnofilter en vue d'une
   * future sauvegarde
   */
  persist(job: Job) {
    this.jobs$.next([...this.jobs$.value,job]);
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
          this.jobs$.next(joblist.map(job => ({...job,pubDate:new Date(job.pubDate)}))) ;
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
        joblist => { console.log(joblist);
          this.jobs$.next(joblist.map(job => ({...job,pubDate:new Date(job.pubDate)}))) ;
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


