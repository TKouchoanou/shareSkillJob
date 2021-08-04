import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toStr'
})
export class TostrPipe implements PipeTransform {

  transform(skills: Array<{skill:string,level:string}|string>): string {
  return  skills.map((skill)=>{
     if(typeof skill==="string"){
       return skill;
     }
     return skill.skill+" ( "+skill.level+")";
   }).join(' ')

  }

}
