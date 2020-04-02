import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
  pure: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date): string {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
