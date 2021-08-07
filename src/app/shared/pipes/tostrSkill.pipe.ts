import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toStrSkill'
})
export class TostrSkillPipe implements PipeTransform {

  transform(skills: Array<{skill:string,level:string}|string>): string {
  return  skills.map((skill)=>{
     if(typeof skill==="string"){
       return skill;
     }
     return skill.skill+" ( "+skill.level+")";
   }).join(' ')

  }

}
