import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  @Input() cities: any[];
  lat;
  lon;
  weather;
  constructor(private weatherService: WeatherService){}
 ngOnInit(): void {
     this.getLocation();
 }
 getLocation(){
  if("geolocation" in navigator)
  {
    navigator.geolocation.watchPosition((success)=>{
      this.lat = success.coords.latitude;
      this.lon= success.coords.longitude;
      this.weatherService.getWeatherDataByCoords(this.lat,this.lon).subscribe(
        data=>{
          this.weather= data;
          if(this.cities.findIndex(element=>element.name === this.weather.name)==-1)
          this.cities.push(data);
          console.log(this.weather);
        }
      )
    }
    )
  }
 }
 getCity(city)
 {
  
  this.weatherService.getWeatherDataByCityName(city).subscribe(
    data=>{
      this.weather= data;
      console.log(this.weather);
      if(this.cities.findIndex(element=>element.name === this.weather.name)==-1)
      this.cities.push(data);
    }
  )
 }
}
