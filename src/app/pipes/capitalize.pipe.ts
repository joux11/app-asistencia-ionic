import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | undefined): string {

    if (!value) return '';
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
