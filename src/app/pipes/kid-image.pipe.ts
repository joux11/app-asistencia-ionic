import { Pipe, PipeTransform } from '@angular/core';
import { IChild } from '../interfaces/Child.interface';

@Pipe({
  name: 'kidImage'
})
export class KidImagePipe implements PipeTransform {

  transform(kid: IChild): string {
    if (kid.genero == 'femenino') {
      return '../../assets/icon/girl.png'
    }
    return '../../assets/icon/boy.png'
  }
}
