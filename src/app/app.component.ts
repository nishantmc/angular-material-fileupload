import { Component } from '@angular/core';

import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public uploadEvent($event: any) {
    console.log('from client' + JSON.stringify($event));
  }
}