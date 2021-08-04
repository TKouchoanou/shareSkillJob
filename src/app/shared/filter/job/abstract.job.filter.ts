import {Choice, JobFilter,Values} from "../../interfaces/jobFilter.interface";
import {Job} from "../../interfaces/job.interface"


export  class Filter implements JobFilter {
  name!: string;
  values!: Values;
  type!:string;

  filterFunction!:(jobs: Job[])=>Job[];
   valueFilter= (jobs:Job[]):Job[]=>{
   return  jobs.filter((job:Job)=>{
      if(this!==undefined && this.name!==undefined){
        for(let choice of this.values.choices){
          if(!choice.value && choice.name==job[this.name]){
            return false;
          }
        }
      }
      return true;

    });
  }

dateDiffFilters=(jobs:Job[]):Job[]=>{
   return   jobs.filter((job:Job)=>{
        let day = 24 * 3600 * 1000;
        let today = new Date().getTime();
        let pubdate =  job.pubDate.getTime();
        let diff = (today-pubdate)/day;
        return this.values.active.value>=diff;
  });
}


  IntervalFilter= (jobs:Job[]):Job[]=>{
   return  jobs.filter((job:Job)=> {
      if (this !== undefined && this.name !== undefined) {
        for (let choice of this.values.choices) {

          if (!choice.value) {console.log(choice);
            if (
              choice.min &&
              choice.max
            ) {
             console.log(job );
              if (
                job[this.name] >= choice.min &&
                job[this.name] < choice.max
              ) {
                return false; //exclut si la valeur de propriété de job appartient à l'interval dont le check est false
              }
            }
            if (
              !choice.max &&
              job[this.name] >= choice.min
            ) {
              // ici on a seulement un min , on exclut si plus grand que min
              return false;
            }
          }
        }

      }
      return true;
    });

    }


  constructor(name: string, values: Values, filterNum:number=1,type:string="value") {
    this.name=name; this.values=values; this.type=type;


    if (filterNum==1){
      this.filterFn=this.valueFilter;
    }
      if(filterNum==2) {
        this.filterFn = this.IntervalFilter;
      }

    if(filterNum==3) {
      this.filterFn = this.dateDiffFilters;
    }

  }
  set filterFn (filterFunction:(jobs: Job[])=>Job[]){
    this.filterFunction=filterFunction;
  }
  get filterFn ():(jobs: Job[])=>Job[]{
    return this.filterFunction
  }

  static create(){
    let  results:Filter[]=[];
     for(let filter  of  filters ){

       if(filter.type=="value"){
         results.push(new Filter(filter.name,new FilterValues(filter.values,1),1,filter.type));
       }
       if(filter.type=="interval"){
         results.push(new Filter(filter.name,new FilterValues(filter.values,1),2,filter.type));
       }

       if(filter.type=="datediff"){
         let date=new FilterValues(filter.values,2);
         date.active=date.choices[date.choices.length-1];
         results.push(new Filter(filter.name,date,3,filter.type));
       }
    }
    return results;
  }
}


export  class FilterValues implements Values {
  choices: Array<Choice>;
  update:(i: number)=>void
  active:Choice;
  updateMany=(i:number)=>{ this.choices[i].value=!this.choices[i].value}
  updateOne=(i:number)=>{ this.active=this.choices[i]}

  constructor(choices: Choice[], updateNum:number=1) {
    this.choices=choices;
    if(updateNum==1) {
      this.update = this.updateMany;
    }else{
      this.update = this.updateOne;
    }

  }

 set  updateFn(update :(i: number)=>void) {
   this.update=update;
  }

  get  updateFn() :(i: number)=>void{
    return this.update;
  }

}




export const filters = [
  {
    name: "publication date",
    type: "datediff",
    values: [
      { name: "last 24 hours", value: 1,},
      { name: "last 3 day", value: 3},
      { name: "last 7 days", value: 7, },
      { name: "last 2 weeks", value: 14},
      { name: "last 4 weeks", value: 28, },
      { name: "last 2 month", value: 60 },
      { name: "last 4 month", value: 120, },
      { name: "last 8 month", value: 240, },
    ]
  },
  {
    name: "field",
    type: "value",
    values: [
      { name: "Science Teaching", value: true },
      { name: "Mathematics Teaching", value: true },
      { name: "Computer teaching", value: true },
      { name: "Developper", value: true },
      {name: "data science", value: true},
      {name:"Economics",value:true},
      {name:"statistic",value:true},
      {name:" web",value:true},
      {name: "data science", value: true},
      {name: "Other", value: true },
    ]
  },

  {
    name: "type",
    type: "value",
    values: [
      { name: "CDI : Contract of indefinite duration", value: true },
      { name: "CDD: Fixed Term Contract", value: true },
      { name: "Stand-in", value: true },
      { name: "Free-lance", value: true }
    ]
  },

  {
    name: "salary",
    type: "interval",
    values: [
      { name: "< 1000", value: true, min: 0.1, max: 1000 },
      { name: "1000-3000", value: true, min: 1000, max: 3000 },
      { name: "3000-5000", value: true, min: 3000, max: 5000 },
      { name: ">= 5000", value: true, min: 5000, max: false }
    ]
  },
  {
    name: "town",
    type: "value",
    values: [
      { name: "Lyon", value: true },
      { name: "Montpellier", value: true },
      { name: "Nice", value: true },
      { name: "Paris", value: true },
      { name: "Grenoble", value: true }
    ]
  },
  {
    name: "level",
    type: "value",
    values: [
      { name: "starter", value: true },
      { name: "confirmed", value: true },
      { name: "expert", value: true }
    ]
  }
];

