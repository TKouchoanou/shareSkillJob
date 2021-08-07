import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(array:any[],start:number,end:number): Array<any> {
    return array.slice(start,end);
  }

}
