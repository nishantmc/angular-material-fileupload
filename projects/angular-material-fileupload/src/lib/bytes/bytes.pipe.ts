import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bytes'})
export class BytesPipe implements PipeTransform {
  public transform(bytes: number): string {
    if (isNaN(parseFloat('' + bytes)) || !isFinite(bytes)) return '-';
    if (bytes <= 0 ) return '0';
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
        number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(1) +  ' ' + units[number];
  }
}