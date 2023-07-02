import { Pipe, PipeTransform } from '@angular/core';
import { Avatar } from '../../@core/data/avatar.data';

@Pipe({
  name: 'imageBySize',
})
export class ImageBySizePipe implements PipeTransform {
  transform(avatar: Avatar, args?: string): string {
    if (avatar.image && args && avatar.image.hasOwnProperty(args)) {
      return avatar.image[args];
    }
    return '';
  }
}
