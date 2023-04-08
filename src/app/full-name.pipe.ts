import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return `${value.first_name} ${value.last_name}`;
  }

}
