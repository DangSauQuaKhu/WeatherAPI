import { Component, OnChanges, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anothercity',
  templateUrl: './anothercity.component.html',
  styleUrls: ['./anothercity.component.css']
})
export class AnothercityComponent implements OnInit {
  ;
  weather;
  constructor(private weatherService: WeatherService,private _route: ActivatedRoute){}
  ngOnInit(): void {
    console.log("router:",this._route.url);
    let slug = this._route.snapshot.paramMap.get('slug');
    console.log("slug:",slug);
    this.weatherService.getWeatherDataByCityName(slug).subscribe(
      data=>{
        this.weather= data;
        console.log(this.weather);
      }
    )
  }

}
