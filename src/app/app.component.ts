import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareReplayConfig } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherAPI';
  cities: any[] = new Array();
  constructor(private _route: ActivatedRoute){}
}
