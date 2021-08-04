import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value:Array<any> | null | undefined): number{
    if(value){
      return value.length;
    }
    return 0;
  }

}
