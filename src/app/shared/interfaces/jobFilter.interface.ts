import {Job} from "./job.interface";

export interface JobFilter {
  name: string;
  type?: string;
  values: Values
  filterFn: (jobs:Job[])=>Job[];
}
export interface Choice {
  name:string;
  value:any;
  min?:any;
  max?:any;
  diff?:any;
}
export interface Values {
  updateFn: (i:number)=>void;
  choices: Array<Choice>;
  active?:Choice;
}


export type JobsFilters = JobFilter [];
