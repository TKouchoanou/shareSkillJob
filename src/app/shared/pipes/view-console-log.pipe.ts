import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'consoleLog',
  //greedy
  pure:false
})
export class ViewConsoleLogPipe implements PipeTransform {

  transform(value)  {
    console.log(value)
    return value;
  }

}
