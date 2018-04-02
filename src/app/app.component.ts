import { Input, Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';


import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input()
  httpRequestHeaders: HttpHeaders | {
    [header: string]: string | string[];
  } = new HttpHeaders().set("sampleHeader", "headerValue").set("sampleHeader1", "headerValue1");

  @Input()
  httpRequestParams: HttpParams | {
    [param: string]: string | string[];
  } = new HttpParams().set("sampleRequestParam", "requestValue").set("sampleRequestParam1", "requestValue1");

  public uploadEvent($event: any) {
    console.log('from client' + JSON.stringify($event));
  }
}