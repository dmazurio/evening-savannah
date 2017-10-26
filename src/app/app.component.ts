import { Component } from '@angular/core';
import { ApiService } from './api.service'
@Component({
  selector: 'app-root',
  providers: [ ApiService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
